import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { TImageKitProperties } from "./types";

export const GROUP_NAME = "imagekit";
export const DEFAULT_FIELDS: TImageKitProperties = ["url"];
export const REQUIRED_FIELDS: (keyof UploadResponse)[] = [
  "fileId",
  "thumbnailUrl",
];
