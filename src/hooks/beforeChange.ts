import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { GROUP_NAME } from "../constants";
import Service from "../service";
import {
  TImageKitConfig,
  TUploadOption,
} from "../types";
import { UploadResponse } from "imagekit/dist/libs/interfaces";

type ToSavedProperties = Omit<
  UploadResponse,
  "AITags"
> & {
  AITags: string | undefined;
};

export const getBeforeChangeHooks = (
  config: TImageKitConfig,
  options?: TUploadOption
) => {
  const service = new Service(config);
  const uploadBeforeChange: BeforeChangeHook =
    async (args) => {
      const file = args.req.files?.file;
      if (file) {
        const uploadResponse =
          await service.upload(file, options);
        let AITags = "";
        uploadResponse.AITags?.forEach(
          (tag, index) => {
            AITags += (tag as any)?.name;
            const lastIndex =
              index ===
              (uploadResponse.AITags?.length ||
                0) -
                1;

            if (!lastIndex) {
              AITags += ",";
            }
          }
        );

        let savedProperties: ToSavedProperties = {
          ...uploadResponse,
          AITags,
        };

        return {
          ...args.data,
          [GROUP_NAME]: savedProperties,
        };
      }
    };

  return uploadBeforeChange;
};
