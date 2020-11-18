import { TonClient } from "@ton-client-ts/core";
// @ts-ignore
import load from "./load.js";

(async () => {
  TonClient.loadBinaryLibrary(
    (): Promise<any> =>
      new Promise((res) =>
        res(
          load({
            binaryUrl: "./tonclient.wasm",
          })()
        )
      )
  );
})();

export { TonClient };
