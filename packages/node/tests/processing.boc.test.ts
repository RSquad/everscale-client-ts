import { TonClient } from "../src";
import multisigPackage from "./assets/multisig.package";
import { multisigAddress, multisigPubkey, multisigSecretKey } from "./data";

let tonClient: TonClient;

beforeAll(() => {
  tonClient = new TonClient({ network: { server_address: "net.ton.dev" } });
  return tonClient;
});

test("test_send_message test_wait_for_transaction", async () => {
  const encoded = await tonClient.abi.encode_message({
    abi: {
      type: "Contract",
      value: multisigPackage.abi,
    },
    signer: {
      type: "Keys",
      keys: {
        public: multisigPubkey,
        secret: multisigSecretKey,
      },
    },
    address: multisigAddress,
    call_set: {
      function_name: "sendTransaction",
      input: {
        dest: multisigAddress,
        value: 100_000,
        bounce: false,
        flags: 3,
        payload: "",
      },
    },
  });
  const { shard_block_id } = await tonClient.processing.send_message({
    message: encoded.message,
    abi: {
      type: "Contract",
      value: multisigPackage.abi,
    },
    send_events: false,
  });
  const result = await tonClient.processing.wait_for_transaction({
    message: encoded.message,
    abi: {
      type: "Contract",
      value: multisigPackage.abi,
    },
    shard_block_id,
    send_events: false,
  });
  expect(result.transaction).toBeDefined();
});

test("test_process_message", async () => {
  const result = await tonClient.processing.process_message({
    message_encode_params: {
      abi: { type: "Contract", value: multisigPackage.abi },
      signer: { type: "Keys", keys: { public: multisigPubkey, secret: multisigSecretKey } },
      address: multisigAddress,
      call_set: {
        function_name: "sendTransaction",
        input: {
          dest: multisigAddress,
          value: 100_000,
          bounce: false,
          flags: 3,
          payload: "",
        },
      },
    },
    send_events: false,
  });
  expect(result.transaction).toBeDefined();
});
