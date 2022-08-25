import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { TImageKitAttributes } from "./types";

export const GROUP_NAME = "imagekit";
export const DEFAULT_FIELDS: TImageKitAttributes = ["url"];
export const REQUIRED_FIELDS: (keyof UploadResponse)[] = [
  "fileId",
  "thumbnailUrl",
];
