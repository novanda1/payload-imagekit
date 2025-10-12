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
      const file = args.req?.file;

      const uploadOptions = {
        ...(options || {}),
        folder: typeof options?.folder === 'string' ? options.folder : options?.folder?.(args.req)
      };

      if (file) {
        try {
          const uploadResponse =
            await service.upload(file, uploadOptions);
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
        } catch (error) {
          args.req.payload.logger.error(
            `[plugin-imagekit]: There was an error while uploading the media with filename ${options?.fileName}:`,
          )
          args.req.payload.logger.error(error)
        }
      }
    };

  return uploadBeforeChange;
};
