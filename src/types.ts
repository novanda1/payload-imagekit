import { UploadResponse, UploadOptions } from "imagekit/dist/libs/interfaces";
import { PayloadRequest } from "payload/types";

export type TImageKitProperty = keyof Omit<
  Omit<UploadResponse, "thumbnailUrl">,
  "fileId"
>;
export type TImageKitProperties = TImageKitProperty[];

export type CollectionOptions = {
  uploadOption?: TUploadOption;
  savedProperties?: TImageKitProperties;
  disableLocalStorage?: boolean;
};

export type CollectionsOptions = {
  [slug: string]: CollectionOptions;
}

export type TPluginOption = {
  config: TImageKitConfig;
  collections?: CollectionsOptions;
};

export type TImageKitConfig = {
  publicKey: string;
  privateKey: string;
  endpoint: string;
};

export type TUploadOption = Partial<Omit<Omit<UploadOptions, "file">, 'folder'>> & { folder?: string | ((req: PayloadRequest) => string) };
