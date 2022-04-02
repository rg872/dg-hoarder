import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import type {
  Channel,
  DiscoveredFile,
  MovieParams,
  fetchPayload,
  MovieProvider,
  TorrentFile,
} from "./type-discover";

interface BaseQueryArgs {
  channel: Channel;
  payload: fetchPayload;
}

const discoverApiBaseQuery =
  (): BaseQueryFn<BaseQueryArgs, unknown, unknown> =>
  async ({ channel, payload }) => {
    try {
      const result = window.api.fileInfo(channel, payload);
      return { data: result };
    } catch (error) {
      return {
        error,
      };
    }
  };

export const discoverApi = createApi({
  reducerPath: "discoverApi",
  baseQuery: discoverApiBaseQuery(),
  endpoints: (builder) => ({
    getMovieList: builder.query<
      DiscoveredFile[],
      {
        providers: MovieProvider[];
        params: MovieParams;
      }
    >({
      query: ({ providers, params }) => ({
        channel: "fileInfo/fetchMovieList",
        payload: {
          providers,
          params,
        },
      }),
    }),
    getMovieDetail: builder.query<
      TorrentFile,
      {
        provider: MovieProvider;
        id: string;
      }
    >({
      query: ({ provider, id }) => ({
        channel: "fileInfo/fetchMovieDetail",
        payload: {
          provider,
          id,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMovieListQuery,
  useGetMovieDetailQuery,
  useLazyGetMovieDetailQuery,
  useLazyGetMovieListQuery,
} = discoverApi;
