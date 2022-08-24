import { BeforeChangeHook } from "payload/dist/collections/config/types";
import Service from "../service";
import { TImageKitConfig, TUploadOption } from "../types";

export const getBeforeChangeHooks = (
  config: TImageKitConfig,
  options?: TUploadOption
) => {
  const service = new Service(config);
  const uploadBeforeChange: BeforeChangeHook = async (args) => {
    const file = args.req.files?.file;
    if (file) {
      const uploadResponse = await service.upload(file, options);

      return {
        ...args.data,
        filename: uploadResponse.name,
        fileId: uploadResponse.fileId,
        imageUrl: uploadResponse.url,
        thumbnailUrl: uploadResponse.thumbnailUrl,
      };
    }
  };

  return uploadBeforeChange;
};
