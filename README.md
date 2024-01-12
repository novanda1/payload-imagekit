# Payload CMS ImageKit Plugin

This plugin sync your image to ImageKit.

## Installation

```sh
npm install payloadcms-plugin-imagekit
```

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
        endpoint: "https://ik.imagekit.io/your_imagekit_id/",
      },
      collections: {
        media: {
          uploadOption: {
            folder: "some folder",
            extensions: [
              {
                name: "aws-auto-tagging",
                minConfidence: 80, // only tags with a confidence value higher than 80% will be attached
                maxTags: 10, // a maximum of 10 tags from aws will be attached
              },
              {
                name: "google-auto-tagging",
                minConfidence: 70, // only tags with a confidence value higher than 70% will be attached
                maxTags: 10, // a maximum of 10 tags from google will be attached
              },
            ],
          },
          savedProperties: ["url", "AITags"],
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

### config

Type `object`

- publicKey: type `string`
- privateKey: type `string`
- endpoint: type `string`;

### collections

Type `object`

- [key] (required)  
  type: `string`  
  description: Object keys should be PayloadCMS collection name that store the media/image.  
  value type: `object`  
  value options:

  - uploadOption (optional)  
    type: `object`  
    type detail: [TUploadOption](https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#request-structure-multipart-form-data). Except `file`.  
    description: An options to saved in ImageKit.

  - savedProperties (optional)  
    type: `[]string`  
    type detail: [TImageKitProperties](https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#understanding-response). Except `thumbnailUrl` and `fileId`.  
    description: An object that saved to PayloadCMS/Database that you may need it for your Frontend.

  - disableLocalStorage (optional)  
    type: `boolean`  
    default: `true`  
    description: Completely disable uploading files to disk locally. [More](https://payloadcms.com/docs/upload/overview#disabling-local-upload-storage)

## Payload Cloud
If your project is hosted using Payload Cloud - their default file storage solution will conflict with this plugin. You will need to disable file storage via the [Payload Cloud plugin](https://github.com/payloadcms/payload/tree/d0f7677d5ff2e0109fc348260d87e2606fdbd293/packages/plugin-cloud) like so:
```js
// ...
plugins: [
  payloadCloud({
    storage: false, // Disable file storage
  }),
  imagekitPlugin({
    // Your imagekit config here
  }),
],
// ...
```

  ## Screenshot

  ![image](https://user-images.githubusercontent.com/57532279/186620627-95fc5a94-8456-40d6-bcf7-2e7034cd3abc.png)
