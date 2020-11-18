module.exports = {
  entry: {
    main: "./src/index.ts",
  },
  target: "node",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    libraryTarget: "commonjs",
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".js", ".json", ".node"],
    symlinks: true,
  },
  plugins: [],

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
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
  optimization: {
    splitChunks: false,
    minimize: false,
  },
};
