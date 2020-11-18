import { TonClient } from "../src";
import {
  multisigAccountId,
  multisigAddress,
  multisigBase64,
  multisigBase64Bounceable,
  multisigBase64BounceableUrl,
  multisigBase64Url,
} from "./data";

let tonClient: TonClient;

beforeAll(() => {
  tonClient = new TonClient({ network: { server_address: "net.ton.dev" } });
  return tonClient;
});

test("convert_address from accountId to hex", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigAccountId,
    output_format: { type: "Hex" },
  });
  expect(multisigAddress).toBe(address);
});

test("convert_address from accountId to base64", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigAccountId,
    output_format: {
      type: "Base64",
      url: false,
      test: true,
      bounce: false,
    },
  });
  expect(multisigBase64).toBe(address);
});

test("convert_address from accountId to base64Url", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigAccountId,
    output_format: {
      type: "Base64",
      url: true,
      test: true,
      bounce: false,
    },
  });
  expect(multisigBase64Url).toBe(address);
});

test("convert_address from accountId to base64Bounceable", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigAccountId,
    output_format: {
      type: "Base64",
      url: false,
      test: true,
      bounce: true,
    },
  });
  expect(multisigBase64Bounceable).toBe(address);
});

test("convert_address from accountId to base64BounceableUrl", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigAccountId,
    output_format: {
      type: "Base64",
      url: true,
      test: true,
      bounce: true,
    },
  });
  expect(multisigBase64BounceableUrl).toBe(address);
});

test("convert_address from hex to accountId", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigAddress,
    output_format: { type: "AccountId" },
  });
  expect(multisigAccountId).toBe(address);
});

test("convert_address from hex to base64", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigAddress,
    output_format: {
      type: "Base64",
      url: false,
      test: true,
      bounce: false,
    },
  });
  expect(multisigBase64).toBe(address);
});

test("convert_address from hex to base64Url", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigAddress,
    output_format: {
      type: "Base64",
      url: true,
      test: true,
      bounce: false,
    },
  });
  expect(multisigBase64Url).toBe(address);
});

test("convert_address from hex to base64Bounceable", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigAddress,
    output_format: {
      type: "Base64",
      url: false,
      test: true,
      bounce: true,
    },
  });
  expect(multisigBase64Bounceable).toBe(address);
});

test("convert_address from hex to base64BounceableUrl", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigAddress,
    output_format: {
      type: "Base64",
      url: true,
      test: true,
      bounce: true,
    },
  });
  expect(multisigBase64BounceableUrl).toBe(address);
});

test("convert_address from base64 to hex", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigBase64,
    output_format: { type: "Hex" },
  });
  expect(multisigAddress).toBe(address);
});

test("convert_address from base64 to accountId", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigBase64,
    output_format: {
      type: "AccountId",
    },
  });
  expect(multisigAccountId).toBe(address);
});

test("convert_address from base64Url to hex", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigBase64Url,
    output_format: { type: "Hex" },
  });
  expect(multisigAddress).toBe(address);
});

test("convert_address from base64Url to accountId", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigBase64Url,
    output_format: {
      type: "AccountId",
    },
  });
  expect(multisigAccountId).toBe(address);
});

test("convert_address from base64Bounceable to hex", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigBase64Bounceable,
    output_format: { type: "Hex" },
  });
  expect(multisigAddress).toBe(address);
});

test("convert_address from base64Bounceable to accountId", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigBase64Bounceable,
    output_format: {
      type: "AccountId",
    },
  });
  expect(multisigAccountId).toBe(address);
});

test("convert_address from base64BounceableUrl to hex", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigBase64BounceableUrl,
    output_format: { type: "Hex" },
  });
  expect(multisigAddress).toBe(address);
});

test("convert_address from base64BounceableUrl to accountId", async () => {
  const { address } = await tonClient.utils.convert_address({
    address: multisigBase64BounceableUrl,
    output_format: {
      type: "AccountId",
    },
  });
  expect(multisigAccountId).toBe(address);
});

test("test getBalance hex address", async () => {
  const result = await tonClient.utils.getBalance(
    "0:29af2121fc07700c9b51842a581b23316dcc5984ef4fd79f5c209eef19427565",
    "dec"
  );
  expect(+result).toBeGreaterThanOrEqual(0);
});
