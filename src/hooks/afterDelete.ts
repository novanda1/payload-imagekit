import { AfterDeleteHook } from "payload/dist/collections/config/types";
import { GROUP_NAME } from "../constants";

import Service from "../service";
import { TImageKitConfig } from "../types";

export const getAfterDeleteHooks = (
  config: TImageKitConfig,
  groupName: string = GROUP_NAME
) => {
  const service = new Service(config);

  const deleteAfterDelete: AfterDeleteHook = async ({ doc, req }) => {
    if (doc[groupName]) {
      try {
        await service.delete(doc[groupName].fileId)
      } catch (error) {
        req.payload.logger.error(
          `[plugin-imagekit]: There was an error while deleting the media with fileId ${doc[groupName].fileId}:`,
        )
        req.payload.logger.error(error)
      }
    };
  };

  return deleteAfterDelete;
};
