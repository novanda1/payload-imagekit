// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";

import imagekitPlugin from "payloadcms-plugin-imagekit";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    imagekitPlugin({
      config: {
        publicKey: process.env.IK_PUBLIC_KEY!,
        privateKey: process.env.IK_PRIVATE_KEY!,
        endpoint: process.env.IK_ENDPOINT!,
      },
      collections: {
        media: {
          uploadOption: {
            folder: "test",
          },
          savedProperties: ["url", "AITags"],
        },
      },
    }),
  ],
});
