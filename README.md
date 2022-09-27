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

### colections 
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

  ## Screenshot

  ![image](https://user-images.githubusercontent.com/57532279/186620627-95fc5a94-8456-40d6-bcf7-2e7034cd3abc.png)
