import { buildConfig } from "payload/config";
import path from "path";
import Categories from "./collections/Categories";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";
import Media from "./collections/Media";
import imagekitPlugin from "payloadcms-plugin-imagekit";

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
  },
  collections: [Categories, Posts, Tags, Users, Media],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    imagekitPlugin({
      config: {
        publicKey: process.env.IK_PUBLIC_KEY,
        privateKey: process.env.IK_PRIVATE_KEY,
        endpoint: process.env.IK_ENDPOINT,
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
