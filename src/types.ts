import { UploadResponse, UploadOptions } from "imagekit/dist/libs/interfaces";

export type TImageKitAttribute = keyof UploadResponse;
export type TImageKitAttributes = TImageKitAttribute[];

export type TPluginOption = {
  config: TImageKitConfig;
  collections: {
    [slug: string]: {
      uploadOption?: TUploadOption;
      savedAttributes?: TImageKitAttributes;
      disableLocalStorage?: boolean;
    };
  };
};

export type TImageKitConfig = {
  publicKey: string;
  privateKey: string;
  endpoint: string;
};

export type TUploadOption = Partial<Omit<UploadOptions, "file">>;
