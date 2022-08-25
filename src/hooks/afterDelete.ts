import { AfterDeleteHook } from "payload/dist/collections/config/types";
import { GROUP_NAME } from "../constants";

import Service from "../service";
import { TImageKitConfig } from "../types";

export const getAfterDeleteHooks = (
  config: TImageKitConfig,
  groupName: string = GROUP_NAME
) => {
  const service = new Service(config);

  const deleteAfterDelete: AfterDeleteHook = async ({ doc }) => {
    if (doc[groupName]) await service.delete(doc[groupName].fileId);
  };

  return deleteAfterDelete;
};
