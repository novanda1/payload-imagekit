# Payload CMS ImageKit Plugin

This plugin sync your image to ImageKit.

#### Requirements

- Payload version `1.0.19` or higher is required

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
    }),
  ],
});
```

## Plugin options

This plugin have 1 parameter that contain an object.

| Option                   | Description                        |
| ------------------------ | ---------------------------------- |
| `config` (required)      | ImageKit Config `ImageKitOptions ` |
| `collections` (optional) | Collections specific config        |
