# Payload CMS ImageKit Plugin

This plugin sync your image to ImageKit.

#### Requirements

- Payload version `1.0.19` or higher is required
- ImageKit

## Installation
`npm i payloadcms-plugin-imagekit`

## Usage

Install this plugin within your Payload as follows:

```js
import { buildConfig } from "payload/config";
import imagekitPlugin from "payloadcms-plugin-imagekit";

export default buildConfig({
  // ...
  plugins: [
    imagekitPlugin({
      config: {
        publicKey: "your_public_api_key",
        privateKey: "your_private_api_key",
        urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/",
      },
      collections: {
        media: {
          uploadOption: {
            folder: "some folder",
          },
        },
      },
    }),
  ],
});
```

## Plugin options

This plugin have 1 parameter that contain an object.

| Option                   | Description                        |
| ------------------------ | ---------------------------------- |
| `config` (required)      | ImageKit Config `ImageKitOptions ` |
| `collections` (optional) | Collections options                |

### Colections options

An object than contain all collection.  
The `key` is a collection name that need to save the images to ImageKit.  
The `value` is a `CollectionOption`

default value `media: {}`

### `CollectionOption`

#### `disableLocalStorage`
type: `boolean`

Completely disable uploading files to disk locally. [More](https://payloadcms.com/docs/upload/overview#disabling-local-upload-storage).

#### `savedProperties`
type: `array`  
description: All [ImageKit response properties](https://docs.imagekit.io/api-reference/upload-file-api/server-side-file-upload#response-code-and-structure-json) except  `fileId` and `thumbnailUrl`.  
source: `(keyof Omit<Omit<UploadResponse, "thumbnailUrl">,"fileId">)[]`

ImageKit Properties that need to saved in collections (inside the `imagekit` object).  
The properties are come from ImageKit [UploadResponse](https://docs.imagekit.io/api-reference/upload-file-api/server-side-file-upload#response-code-and-structure-json)

**Note**  
`savedProperties` will add `fileId` and `thumbnailUrl` on your selected properties.  
Or if you leave it empty the default value would be `[ "fileId", "thumbnailUrl" ]`.

#### `uploadOption`
type: `object`

All [ImageKit upload options](https://docs.imagekit.io/api-reference/upload-file-api/server-side-file-upload#request-structure-multipart-form-data) except `file`.

## Screenshot

![image](https://user-images.githubusercontent.com/57532279/186620627-95fc5a94-8456-40d6-bcf7-2e7034cd3abc.png)
