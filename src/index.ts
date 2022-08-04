import Service, { TImageKitConfig } from "./service";

const plugin =
  (imagekitConfig: TImageKitConfig) =>
  (incomingConfig: any): any => {
    const { collections: incomingCollections } = incomingConfig;

    const collections: [] =
      incomingCollections?.map((incomingCollection: any) => {
        if (!incomingCollection.upload) return incomingCollection;

        const service = new Service(imagekitConfig);
        const uploadBeforeChange: any = async (args: any) => {
          const file = args.req.files?.file;
          if (file) {
            const uploadResponse = await service.upload(file);

            return {
              ...args.data,
              filename: uploadResponse.name,
              fileId: uploadResponse.fileId,
              imageUrl: uploadResponse.url,
              thumbnailUrl: uploadResponse.thumbnailUrl,
            };
          }
        };

        const deleteAfterDelete: any = async (args: any) => {
          await service.delete(args.doc.fileId);
        };

        const incomingHooks = incomingCollection.hooks;

        const beforeChange: any[] = incomingHooks?.beforeChange
          ? [...incomingHooks.beforeChange, uploadBeforeChange]
          : [uploadBeforeChange];

        const afterDelete: any[] = incomingHooks?.afterDelete
          ? [...incomingHooks.afterDelete, deleteAfterDelete]
          : [deleteAfterDelete];

        return {
          ...incomingCollection,
          hooks: { ...incomingCollection.hooks, beforeChange, afterDelete },
        };
      }) || [];

    const config: any = { ...incomingConfig, collections };
    return config;
  };

export default plugin;
