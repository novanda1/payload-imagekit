import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { Config, Plugin } from "payload/config";
import { CollectionConfig, Field } from "payload/types";
import { GROUP_NAME } from "./constants";
import { getFields, requiredFields } from "./fields";
import { getAfterDeleteHooks } from "./hooks/afterDelete";
import { getBeforeChangeHooks } from "./hooks/beforeChange";
import { CollectionsOptions, TPluginOption } from "./types";

type OurConfig =
  | Omit<Config, "admin">
type OurPlugin = (config: OurConfig) => Promise<OurConfig> | OurConfig;

const plugin =
  (imagekitConfig: TPluginOption): OurPlugin =>
    (incomingConfig: OurConfig): OurConfig => {
      const { collections: allCollectionOptions } = imagekitConfig;
      if (!allCollectionOptions)
        (allCollectionOptions as unknown as CollectionsOptions).media = {}; // default value

      const collections = (incomingConfig.collections || []).map(
        (existingCollection: CollectionConfig): CollectionConfig => {
          const options = allCollectionOptions![existingCollection.slug];

          if (options) {
            const incomingFields: Field[] = [
              ...existingCollection.fields,
              {
                name: GROUP_NAME,
                type: "group",
                fields: [
                  ...requiredFields,
                  ...getFields(options?.savedProperties),
                ],
                admin: { readOnly: true },
              },
            ];

            const incomingHooks = {
              ...(existingCollection?.hooks || {}),
              beforeChange: [
                ...(existingCollection.hooks?.beforeChange || []),
                getBeforeChangeHooks(imagekitConfig.config, options.uploadOption),
              ],
              afterDelete: [
                ...(existingCollection.hooks?.afterDelete || []),
                getAfterDeleteHooks(imagekitConfig.config),
              ],
            };

            return {
              ...existingCollection,
              upload: {
                ...(typeof existingCollection.upload === "object"
                  ? existingCollection.upload
                  : {}),
                adminThumbnail: ({ doc }) => {
                  return (
                    (doc[GROUP_NAME] as Partial<UploadResponse>)?.thumbnailUrl ||
                    ""
                  );
                },
                disableLocalStorage:
                  typeof options.disableLocalStorage === "boolean"
                    ? options.disableLocalStorage
                    : true,
              },
              fields: incomingFields,
              hooks: incomingHooks,
            };
          }

          return existingCollection;
        }
      );

      const config: OurConfig = {
        ...incomingConfig,
        collections,
      };
      return config;
    };

export default plugin;
