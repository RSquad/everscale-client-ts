import { TonClient } from "../src";
const fs = require("fs");

test("version return correct version of TON-SDK", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const { version } = await tonClient.client.version();
  console.log(`VERSION: ${version}`);
  expect(version).toBe("1.24.0");
});

test("get_api_reference return non empty modules", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const result = await tonClient.client.get_api_reference();
  expect(result.api.modules).toBeTruthy();
  expect(result.api.modules).not.toHaveLength(0);
});

test("build_info return dependencies", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const result = await tonClient.client.build_info();
  expect(result.dependencies).toBeTruthy();
});
