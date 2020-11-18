const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.ts",
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".js", ".json", ".node"],
    symlinks: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, "./packages/web/src/tonclient.wasm") }],
      options: {
        concurrency: 100,
      },
    }),
    new HtmlWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(ts?)|(js?)$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            rootMode: "upward",
          },
        },
      },
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ],
  },
  optimization: {
    splitChunks: false,
    minimize: false,
  },
};
