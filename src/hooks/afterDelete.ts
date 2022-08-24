import { AfterDeleteHook } from "payload/dist/collections/config/types";

import Service from "../service";
import { TImageKitConfig } from "../types";

export const getAfterDeleteHooks = (
  config: TImageKitConfig,
  groupName: string = "imagekit"
) => {
  const service = new Service(config);

  const deleteAfterDelete: AfterDeleteHook = async (args) => {
    await service.delete(args.doc[groupName].fileId);
  };

  return deleteAfterDelete;
};
