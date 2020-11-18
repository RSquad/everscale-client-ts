import { TonClient } from "../src";
import contestPackage from "./assets/contest.package";
import { multisigPubkey, multisigSecretKey } from "./data";

let tonClient: TonClient;

beforeAll(() => {
  tonClient = new TonClient({ network: { server_address: "net.ton.dev" } });
  return tonClient;
});

test("decode_message input", async () => {
  const message =
    "te6ccgEBAwEAyAABRYgARXIUFY+fmKqBKSJRsmc3tUYG/TCUR4TMIyqYYZNHm+oMAQHlvC+nve3dulBm+Jo+SOxSG4SsWBrwi7Fz3hW+f5uwzlnZNXkx7fyjo+NlZj8DmIl5n5m/NAUJyP8HYIcKW7Qwh0eMKxUBrnEUdM0QQsqgOwhcyxbMOrb5j4VsROxkMWvVQAAAXUMbqDADdE0kgAFAAAABYAIAVFRvbyBjb21wbGV4IGFuZCBmb2N1c2VkIG9uIFRPTiBzcGVjdWxhdGlvbg==";
  const decoded = await tonClient.abi.decode_message({
    abi: { type: "Contract", value: contestPackage.abi },
    message,
  });
  expect(decoded.body_type).toBe("Input");
  expect(decoded.name).toBe("voteForCommented");
});

test("decode_message_body input", async () => {
  const message =
    "te6ccgEBAwEAyAABRYgARXIUFY+fmKqBKSJRsmc3tUYG/TCUR4TMIyqYYZNHm+oMAQHlvC+nve3dulBm+Jo+SOxSG4SsWBrwi7Fz3hW+f5uwzlnZNXkx7fyjo+NlZj8DmIl5n5m/NAUJyP8HYIcKW7Qwh0eMKxUBrnEUdM0QQsqgOwhcyxbMOrb5j4VsROxkMWvVQAAAXUMbqDADdE0kgAFAAAABYAIAVFRvbyBjb21wbGV4IGFuZCBmb2N1c2VkIG9uIFRPTiBzcGVjdWxhdGlvbg==";
  const { parsed } = await tonClient.boc.parse_message({ boc: message });
  const decoded = await tonClient.abi.decode_message_body({
    abi: {
      type: "Contract", value: contestPackage.abi
    },
    body: parsed.body,
    is_internal: false,
  });
  expect(decoded.body_type).toBe("Input");
  expect(decoded.name).toBe("voteForCommented");
});

test("test_encode_message input", async () => {
  const deploySet = {
    tvc: contestPackage.imageBase64,
    // initial_data: { debugNonce: Math.random().toFixed() },
  };
  const callSet = {
    function_name: "constructor",
    input: {
      title: Buffer.from("title").toString("hex"),
      link: Buffer.from("link").toString("hex"),
      hash: `0x29af2121fc07700c9b51842a581b23316dcc5984ef4fd79f5c209eef19427565}`,
      juryAddr: "0:29af2121fc07700c9b51842a581b23316dcc5984ef4fd79f5c209eef19427565",
      juryKeys: [`0x${multisigPubkey}`],
    },
  };
  const signer: any = {
    type: "Keys",
    keys: { public: multisigPubkey, secret: multisigSecretKey },
  };

  try {
    await tonClient.abi.encode_message({
      abi: { type: "Contract", value: contestPackage.abi },
      signer,
      deploy_set: deploySet,
      call_set: callSet,
    });
    expect.anything();
  } catch (err) {
    expect(err).toBeInstanceOf(TonClient.TonClientError);
  }
});
