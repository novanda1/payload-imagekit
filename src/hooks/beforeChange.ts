import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { DEFAULT_FIELDS, GROUP_NAME } from "../constants";
import Service from "../service";
import {
  TImageKitAttributes,
  TImageKitConfig,
  TUploadOption
} from "../types";

export const getBeforeChangeHooks = (
  config: TImageKitConfig,
  options?: TUploadOption,
  savedAttributes: TImageKitAttributes = DEFAULT_FIELDS
) => {
  const service = new Service(config);
  const uploadBeforeChange: BeforeChangeHook = async (args) => {
    const file = args.req.files?.file;
    if (file) {
      const uploadResponse = await service.upload(file, options);

      return {
        ...args.data,
        [GROUP_NAME]: uploadResponse,
      };
    }
  };

  return uploadBeforeChange;
};
