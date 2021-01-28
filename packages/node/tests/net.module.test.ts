import { TonClient } from "../src";

let tonClient: TonClient;

beforeAll(() => {
  tonClient = new TonClient({ network: { server_address: "net.ton.dev" } });
  return tonClient;
});

test("query_collection block_signatures returns non empty result", async () => {
  const { result } = await tonClient.net.query_collection({
    collection: "blocks_signatures",
    filter: {},
    result: "id",
    limit: 10,
  });
  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
});

test("query_collection accounts returns non empty result", async () => {
  const { result } = await tonClient.net.query_collection({
    collection: "accounts",
    filter: {},
    result: "id balance(format:DEC)",
    limit: 10,
  });
  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
});

test("query_collection messages returns non empty result", async () => {
  const { result } = await tonClient.net.query_collection({
    collection: "messages",
    filter: {
      created_at: { gt: 1601541625 },
    },
    result: "body created_at",
    limit: 10,
  });
  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
});

test("query_collection fail cuz of incorrect query", async () => {
  try {
    const { result } = await tonClient.net.query_collection({
      collection: "messages",
      filter: {},
      result: "",
    });
    expect(result).toBeInstanceOf(TonClient.TonClientError);
  } catch (err) {
    expect(err).toBeInstanceOf(TonClient.TonClientError);
  }
});

test("wait_for_collection returns correct result", async () => {
  const now = +(Date.now() / 1000).toFixed();
  const { result } = await tonClient.net.wait_for_collection({
    collection: "transactions",
    filter: {
      now: { gt: now },
    },
    result: "id now",
  });
  expect(result.now).toBeGreaterThan(now);
});

test("wait_for_collection fail cuz of timeout", async () => {
  const now = +(Date.now() / 1000).toFixed();
  try {
    const { result } = await tonClient.net.wait_for_collection({
      collection: "transactions",
      filter: {
        now: { gt: now },
      },
      result: "id now",
      timeout: 1,
    });
    expect(result).toBeInstanceOf(TonClient.TonClientError);
  } catch (err) {
    expect(err).toBeInstanceOf(TonClient.TonClientError);
  }
});

test("subscribe_collection", async () => {
  const now = +(Date.now() / 1000).toFixed();
  const results: any[] = [];
  const handle = await tonClient.net.subscribe_collection(
    {
      collection: "messages",
      filter: {
        created_at: { gt: now },
      },
      result: "created_at",
    },
    async (response: any) => {
      results.push(response);
      if (Date.now() > now + 30000) {
        await tonClient.net.unsubscribe(handle);
        expect(results).toBeDefined();
        expect(results.length).toBeGreaterThan(0);
      }
    }
  );
});
