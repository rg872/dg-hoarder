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

export interface IApi {
  i18nextElectronBackend: II18nextElectronBackend;
  store: any;
  contextMenu: any;
  licenseKeys: ILicenseKeys;
}
