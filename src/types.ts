import { UploadResponse, UploadOptions } from "imagekit/dist/libs/interfaces";
import { PayloadRequest } from "payload";

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

export type TUploadedFile = {
  clientUploadContext?: unknown;
  data: Buffer;
  mimetype: string;
  name: string;
  size: number;
  tempFilePath?: string;
  mv?: (path: string, callback: (err?: Error) => void) => void;
  encoding?: string;
  truncated?: boolean;
  md5?: string;
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
