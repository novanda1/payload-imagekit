import { Config } from "payload/config";
import {
  AfterDeleteHook,
  BeforeChangeHook,
} from "payload/dist/collections/config/types";
import { CollectionConfig } from "payload/types";
import Service, { TImageKitConfig, TUploadOption } from "./service";

type TPluginOption = {
  config: TImageKitConfig;
  uploadOption: TUploadOption;
};

const plugin =
  (imagekitConfig: TPluginOption) =>
  (incomingConfig: Config): Config => {
    const { collections: incomingCollections } = incomingConfig;

    const collections: CollectionConfig[] =
      incomingCollections?.map((incomingCollection) => {
        if (!incomingCollection.upload) return incomingCollection;

        const service = new Service(imagekitConfig.config);
        const uploadBeforeChange: BeforeChangeHook = async (args) => {
          const file = args.req.files?.file;
          if (file) {
            const uploadResponse = await service.upload(
              file,
              imagekitConfig.uploadOption
            );

            return {
              ...args.data,
              filename: uploadResponse.name,
              fileId: uploadResponse.fileId,
              imageUrl: uploadResponse.url,
              thumbnailUrl: uploadResponse.thumbnailUrl,
            };
          }
        };

        const deleteAfterDelete: AfterDeleteHook = async (args) => {
          await service.delete(args.doc.fileId);
        };

        const incomingHooks = incomingCollection.hooks;

        const beforeChange: BeforeChangeHook[] = incomingHooks?.beforeChange
          ? [...incomingHooks.beforeChange, uploadBeforeChange]
          : [uploadBeforeChange];

        const afterDelete: AfterDeleteHook[] = incomingHooks?.afterDelete
          ? [...incomingHooks.afterDelete, deleteAfterDelete]
          : [deleteAfterDelete];

        return {
          ...incomingCollection,
          hooks: { ...incomingCollection.hooks, beforeChange, afterDelete },
        };
      }) || [];

    const config: Config = { ...incomingConfig, collections };
    return config;
  };

export default plugin;
