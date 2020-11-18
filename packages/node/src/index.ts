import { TonClient } from "@ton-client-ts/core";

let binaryLibraryFile: string;
switch (process.platform) {
  case 'linux':
    binaryLibraryFile = 'tonclient-linux.node';
    break;
  case 'darwin':
    binaryLibraryFile = 'tonclient-mac.node';
    break;
  case 'win32':
    binaryLibraryFile = 'tonclient-win.node';
    break;
  default:
    console.error(`Unsupported platform '${process.platform}'!`);
    binaryLibraryFile = 'unsupported';
    break;
}

let library: typeof TonClient;
try {
  library = require(`./${binaryLibraryFile}`);
} catch (error) {
  const fs = require("fs");
  const os = require("os");
  const path = require("path");
  let addonPath = path.resolve(__dirname, binaryLibraryFile);
  if (fs.existsSync(addonPath)) {
    throw error;
  }
  addonPath = path.resolve(os.homedir(), binaryLibraryFile);
  library = require(addonPath);
}

(async () => {
  TonClient.loadBinaryLibrary((): Promise<any> => new Promise((res) => res(library)));
})();

export { TonClient };
