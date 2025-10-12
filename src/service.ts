import ImageKit from "imagekit";
import { UploadOptions, UploadResponse } from "imagekit/dist/libs/interfaces";
import { TImageKitConfig, TUploadOption, TUploadedFile } from "./types";

class Service {
  private config: TImageKitConfig = {
    endpoint: "",
    privateKey: "",
    publicKey: "",
  };

  constructor(config: TImageKitConfig) {
    this.config = config;
  }

  public async upload(
    file: TUploadedFile,
    options?: TUploadOption
  ): Promise<UploadResponse & {}> {
    const imagekit = new ImageKit({
      privateKey: this.config.privateKey,
      publicKey: this.config.publicKey,
      urlEndpoint: this.config.endpoint,
    });

    const imagekitUploadOptions = options as UploadOptions

    return await imagekit.upload({
      ...imagekitUploadOptions,
      file: file.data,
      fileName: options?.fileName || file.name,
    });
  }

  async delete(fileId: string): Promise<boolean> {
    const imagekit = new ImageKit({
      privateKey: this.config.privateKey,
      publicKey: this.config.publicKey,
      urlEndpoint: this.config.endpoint,
    });

    try {
      await imagekit.deleteFile(fileId);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default Service;
