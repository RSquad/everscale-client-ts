const https = require("https");
const fs = require("fs");
const zlib = require("zlib");
const { series } = require("async");
const { exec } = require("child_process");

if (!fs.existsSync("./bin")) {
  fs.mkdirSync("./bin");
}

const files = [
  {
    dst: "packages/node/src/tonclient-mac.node.gz",
    url: "https://binaries.tonlabs.io/eversdk_1_nodejs_addon_arm64-darwin.gz",
  },
  {
    dst: "packages/node/src/tonclient-win.node.gz",
    url: "https://binaries.tonlabs.io/eversdk_1_nodejs_addon_x64-win32.gz",
  },
  {
    dst: "packages/node/src/tonclient-linux.node.gz",
    url: "https://binaries.tonlabs.io/eversdk_1_nodejs_addon_x64-linux.gz",
  },
  {
    dst: "packages/web/src/tonclient.wasm.gz",
    url: "https://binaries.tonlabs.io/eversdk_1_wasm.gz",
  },
  {
    dst: "packages/web/src/index.js.gz",
    url: "https://binaries.tonlabs.io/eversdk_1_wasm_js.gz",
  },
];

const download = (dst, url, cb) => {
  const file = fs.createWriteStream(dst);
  https
    .get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close(cb);
      });
    })
    .on("error", (err) => {
      fs.unlink(dst);
      if (cb) cb(err.message);
    });
};

const gunzip = (dst, gunzipCb) => {
  zlib.gunzip(fs.readFileSync(dst), (err, res) => {
    if (err) {
      console.error(err);
    } else {
      fs.writeFile(dst.replace(".gz", ""), res, {}, gunzipCb);
    }
  });
};

let downloadCbCounter = 0;
const downloadCb = () => {
  downloadCbCounter += 1;
  if (downloadCbCounter == files.length) {
    files.forEach(({ dst }) => gunzip(dst, gunzipCb));
  }
};

let gunzipCounter = 0;
const gunzipCb = () => {
  gunzipCounter += 1;
  if (gunzipCounter == files.length) {
    series([() => exec("yarn generate")]);
  }
};

files.forEach(({ dst, url }) => download(dst, url, downloadCb));
