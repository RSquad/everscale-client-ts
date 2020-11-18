import { TonClient } from "../src";
import multisigPackage from "./assets/multisig.package";
import { multisigAddress, multisigPubkey, multisigSecretKey } from "./data";

export const sendTokens = async (client: TonClient, address: string, value: number) => {
  await client.processing.process_message({
    message_encode_params: {
      abi: { type: "Contract", value: multisigPackage.abi },
      signer: { type: "Keys", keys: { public: multisigPubkey, secret: multisigSecretKey } },
      address: multisigAddress,
      call_set: {
        function_name: "sendTransaction",
        input: {
          dest: address,
          value,
          bounce: false,
          flags: 3,
          payload: "",
        },
      },
    },
    send_events: false,
  });
};
