import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import type {
  DiscoveredFile,
  DiscoverParams,
  Provider,
  TorrentFile,
} from "./type-discover";

interface BaseQueryArgs {
  api: "movie";
  method: "getlist" | "getdetail";
  provider: Provider | Provider[];
  id?: string;
  params?: unknown;
}

const discoverApiBaseQuery =
  (): BaseQueryFn<BaseQueryArgs, unknown, unknown> =>
  async ({ api, method, provider, params, id }) => {
    try {
      let result;
      if (api === "movie" && method === "getlist") {
        if (!provider?.length)
          throw new Error(
            "Oops, Something wrong happen when fetching movie list"
          );
        result = window.api.getMovieList(
          provider as Provider[],
          params
            ? (params as DiscoverParams & { category: "movie" })
            : undefined
        );
      } else if (api === "movie" && method === "getdetail") {
        if (!provider || typeof provider !== "string")
          throw new Error(
            "Oops, Something wrong happen when fetching movie detail"
          );
        if (!id || typeof id !== "string")
          throw new Error(
            "Oops, Something wrong happen when fetching movie detail"
          );
        result = window.api.getMovieDetail(provider, id);
      }
      return { data: result };
    } catch (error) {
      return {
        error,
      };
    }
  };

export const discoverApi = createApi({
  reducerPath: "discover",
  baseQuery: discoverApiBaseQuery(),
  endpoints: (builder) => ({
    getMovieList: builder.query<
      DiscoveredFile[],
      {
        provider: Provider[];
        params?: DiscoverParams & { category: "movie" };
      }
    >({
      query: ({ provider, params }) => ({
        api: "movie",
        method: "getlist",
        provider,
        params,
      }),
    }),
    getMovieDetail: builder.query<
      TorrentFile,
      {
        provider: Provider;
        id: string;
      }
    >({
      query: ({ provider, id }) => ({
        api: "movie",
        method: "getdetail",
        provider,
        id,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMovieListQuery, useGetMovieDetailQuery } = discoverApi;
