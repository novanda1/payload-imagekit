import { Config } from "payload/config";
import { CollectionConfig, Field } from "payload/types";
import { getFields } from "./fields";
import { getAfterDeleteHooks } from "./hooks/afterDelete";
import { getBeforeChangeHooks } from "./hooks/beforeChange";
import { TPluginOption } from "./types";

const plugin =
  (imagekitConfig: TPluginOption) =>
  (incomingConfig: Config): Config => {
    const { collections: allCollectionOptions } = imagekitConfig;

    const collections = (incomingConfig.collections || []).map(
      (existingCollection): CollectionConfig => {
        const options = allCollectionOptions[existingCollection.slug];

        if (options) {
          const incomingFields: Field[] = [
            ...existingCollection.fields,
            {
              name: options.groupName || "imagekit",
              type: "group",
              fields: getFields(options?.savedAttributes),
              admin: { readOnly: true },
            },
          ];

          const incomingHooks = {
            ...(existingCollection?.hooks || {}),
            beforeChange: [
              ...(existingCollection.hooks?.beforeChange || []),
              getBeforeChangeHooks(
                imagekitConfig.config,
                options.uploadOption,
                options.savedAttributes
              ),
            ],
            afterDelete: [
              ...(existingCollection.hooks?.afterDelete || []),
              getAfterDeleteHooks(imagekitConfig.config),
            ],
          };

          return {
            ...existingCollection,
            fields: incomingFields,
            hooks: incomingHooks,
          };
        }

        return existingCollection;
      }
    );

    const config: Config = {
      ...incomingConfig,
      collections,
    };
    return config;
  };

export default plugin;
