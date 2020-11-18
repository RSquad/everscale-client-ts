module.exports = function babelConfig(api) {
  api.cache.forever();
  return {
    babelrcRoots: [".", "./packages/*"],
    presets: [
      [
        "@babel/env",
        {
          modules: false,
          targets: {
            esmodules: true,
          },
        },
      ],
      "@babel/typescript",
    ],
    plugins: [
      "@babel/syntax-dynamic-import",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-class-properties",
    ],
    env: {
      test: {
        presets: [
          [
            "@babel/env",
            {
              useBuiltIns: "usage",
              targets: {
                browsers: ["> 1%"],
              },
            },
          ],
          "@babel/typescript",
        ],
      },
    },
  };
};
