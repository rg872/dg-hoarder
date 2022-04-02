export type Channel = "appConfig/getAppConfig" | "appConfig/setDownloadFolder";
export type ConfigKey = "downloadFolder";

export interface Config {
  downloadFolder: string;
}
