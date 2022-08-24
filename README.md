# Payload CMS ImageKit Plugin

This plugin sync your image to ImageKit.

## Get Started

### Enable plugin in Payload CMS config

```js
import { buildConfig } from "payload/config";
import imagekitPlugin from "payloadcms-plugin-imagekit";

export default buildConfig({
  // ...
  plugins: [
    imagekitPlugin({
      config: {
        publicKey: "your public key",
        endpoint: "your endpoint",
        privateKey: "your private key",
      },
    }),
  ],
});
```
