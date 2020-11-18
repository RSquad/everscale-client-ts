const base = require("../../jest.config.base.js");

module.exports = {
  ...base,
  name: "node",
  displayName: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
};
