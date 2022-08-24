import { UploadedFile } from "express-fileupload";
import ImageKit from "imagekit";
import { UploadOptions, UploadResponse } from "imagekit/dist/libs/interfaces";

export type TImageKitConfig = {
  publicKey: string;
  privateKey: string;
  endpoint: string;
};

export type TUploadOption = Partial<Omit<UploadOptions, "file">>;

class Service {
  private config: TImageKitConfig = {
    endpoint: "",
    privateKey: "",
    publicKey: "",
  };

  constructor(config: TImageKitConfig) {
    this.config = config;
  }

  private imagekit: ImageKit = new ImageKit({
    privateKey: this.config.privateKey,
    publicKey: this.config.publicKey,
    urlEndpoint: this.config.endpoint,
  });

  async upload(
    file: UploadedFile,
    options?: TUploadOption
  ): Promise<UploadResponse & {}> {
    return await this.imagekit.upload({
      ...options,
      file: file.data,
      fileName: options?.fileName || file.name,
      extensions: options?.extensions || [
        {
          name: "google-auto-tagging",
          maxTags: 5,
          minConfidence: 95,
        },
      ],
    });
  }

  async delete(fileId: string): Promise<boolean> {
    try {
      await this.imagekit.deleteFile(fileId);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default Service;
