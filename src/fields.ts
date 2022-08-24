import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { Field } from "payload/types";
import { TImageKitAttributes } from "./types";

const imagekitField = (name: keyof UploadResponse): Field => {
  const numberField = ["height", "width", "size"];
  const booleanField = ["isPrivateFile"];

  const field: Partial<Field> = {
    name,
  };

  if (numberField.includes(name)) field.type = "number";
  else if (booleanField.includes(name)) field.type = "checkbox";
  else field.type = "text";

  return field as Field;
};

export const getFields = (savedAttributes?: TImageKitAttributes): Field[] => {
  const defaultSavedFields: TImageKitAttributes = ["url", "thumbnailUrl"];
  return (savedAttributes || defaultSavedFields)?.map((name) => {
    return imagekitField(name);
  });
};
