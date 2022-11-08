import { CollectionConfig } from "payload/types";

const Media: CollectionConfig = {
  slug: "media",
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
  access: {
    read: (): boolean => true,
  },
};

export default Media;
