import { BeforeChangeHook } from "payload/dist/collections/config/types";
import Service from "../service";
import {
  TImageKitAttribute,
  TImageKitAttributes,
  TImageKitConfig,
  TUploadOption,
} from "../types";

export const getBeforeChangeHooks = (
  config: TImageKitConfig,
  options?: TUploadOption,
  savedAttributes: TImageKitAttributes = ["url", "thumbnailUrl"]
) => {
  const service = new Service(config);
  const uploadBeforeChange: BeforeChangeHook = async (args) => {
    const file = args.req.files?.file;
    if (file) {
      const uploadResponse = await service.upload(file, options);

      const saved: any = {};
      Object.keys(savedAttributes).forEach((key) => {
        saved[key] = uploadResponse[key as TImageKitAttribute];
      });

      return {
        ...args.data,
        ...saved,
      };
    }
  };

  return uploadBeforeChange;
};
