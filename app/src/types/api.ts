interface I18nextElectronBackend {
  send: (b: any, c: any) => void;
  onReceive: (b: any, c: any) => void;
  onLanguageChange: (b: any) => void;
  clientOptions: {
    environment: any;
    platform: any;
    resourcesPath: string;
  };
}

interface LicenseKeys {
  send: (b: any) => void;
  onReceive: (b: any, c: any) => void;
  clearRendererBindings: () => void;
}

type provider = "public-domain-torrents" | "legit-torrents";

interface Downloadable {
  title: string;
  id: string;
}

interface TorrentLink {
  label: string;
  url: string;
  size?: string;
  seeds?: number;
  peers?: number;
  uploaded_at?: string;
  age?: string;
}
interface Torrent {
  title: string;
  link: string | TorrentLink[];
  desc?: string;
  // if link is an array, all properties below will be included in link array
  size?: string;
  seeds?: number;
  peers?: number;
  uploaded_at?: string;
  age?: string;
}

interface LegitTorrentParams {
  category: "movie" | "music";
  order: "seed" | "name" | "date";
  by: "asc" | "desc";
  pages: number;
  search: string;
}

export interface Api {
  i18nextElectronBackend: I18nextElectronBackend;
  store: any;
  contextMenu: any;
  licenseKeys: LicenseKeys;
  getMovieList: (
    provider: provider,
    params?: LegitTorrentParams
  ) => Promise<Downloadable[]>;
  getMovieDetail: (provider: provider, id: string) => Promise<Torrent>;
}
