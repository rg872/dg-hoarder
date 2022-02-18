interface II18nextElectronBackend {
  send: (b: any, c: any) => void;
  onReceive: (b: any, c: any) => void;
  onLanguageChange: (b: any) => void;
  clientOptions: {
    environment: any;
    platform: any;
    resourcesPath: string;
  };
}

interface ILicenseKeys {
  send: (b: any) => void;
  onReceive: (b: any, c: any) => void;
  clearRendererBindings: () => void;
}

interface IDownloadable {
  title: string;
  detail_id: string;
}

interface ITorrentLink {
  label: string;
  url: string;
  size?: string;
  seeds?: number;
  peers?: number;
  uploaded_at?: string;
  age?: string;
}
interface ITorrent {
  title: string;
  link: string | ITorrentLink[];
  desc?: string;
  // if link is an array, all properties below will be included in link array
  size?: string;
  seeds?: number;
  peers?: number;
  uploaded_at?: string;
  age?: string;
}

export interface IApi {
  i18nextElectronBackend: II18nextElectronBackend;
  store: any;
  contextMenu: any;
  licenseKeys: ILicenseKeys;
  fetchList: {
    getPublicDomainMovies: () => Promise<IDownloadable[]>;
    getPublicDomainMovieDetail: (detail_id: string) => Promise<ITorrent>;
  };
}
