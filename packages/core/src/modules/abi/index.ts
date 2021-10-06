import { TonClient } from "../..";
import {
  ParamsOfEncodeMessageBody,
  ResultOfEncodeMessageBody,
  ParamsOfAttachSignatureToMessageBody,
  ResultOfAttachSignatureToMessageBody,
  ParamsOfEncodeMessage,
  ResultOfEncodeMessage,
  ParamsOfEncodeInternalMessage,
  ResultOfEncodeInternalMessage,
  ParamsOfAttachSignature,
  ResultOfAttachSignature,
  ParamsOfDecodeMessage,
  DecodedMessageBody,
  ParamsOfDecodeMessageBody,
  ParamsOfEncodeAccount,
  ResultOfEncodeAccount,
  ParamsOfDecodeAccountData,
  ResultOfDecodeData,
  ParamsOfUpdateInitialData,
  ResultOfUpdateInitialData,
  ParamsOfDecodeInitialData,
  ResultOfDecodeInitialData,
} from "./types";

/**
 * Provides message encoding and decoding according to the ABI specification.
 */
export class AbiModule {
  tonClient: TonClient;
  constructor(tonClient: TonClient) {
    this.tonClient = tonClient;
  }

  /**
   * Encodes message body according to ABI function call.
   *
   * @param {ParamsOfEncodeMessageBody} param - parameters
   * @returns ResultOfEncodeMessageBody
   */
  encode_message_body(
    params: ParamsOfEncodeMessageBody
  ): Promise<ResultOfEncodeMessageBody> {
    return this.tonClient.request("abi.encode_message_body", params);
  }

  attach_signature_to_message_body(
    params: ParamsOfAttachSignatureToMessageBody
  ): Promise<ResultOfAttachSignatureToMessageBody> {
    return this.tonClient.request(
      "abi.attach_signature_to_message_body",
      params
    );
  }

  /**
   * Encodes an ABI-compatible message
   *
   * @remarks
   * Allows to encode deploy and function call messages,
   * both signed and unsigned.
   *
   * Use cases include messages of any possible type:
   * - deploy with initial function call (i.e. `constructor` or any other function that is used for some kind
   * of initialization);
   * - deploy without initial function call;
   * - signed/unsigned + data for signing.
   *
   * `Signer` defines how the message should or shouldn't be signed:
   *
   * `Signer::None` creates an unsigned message. This may be needed in case of some public methods,
   * that do not require authorization by pubkey.
   *
   * `Signer::External` takes public key and returns `data_to_sign` for later signing.
   * Use `attach_signature` method with the result signature to get the signed message.
   *
   * `Signer::Keys` creates a signed message with provided key pair.
   *
   * [SOON] `Signer::SigningBox` Allows using a special interface to implement signing
   * without private key disclosure to SDK. For instance, in case of using a cold wallet or HSM,
   * when application calls some API to sign data.
   *
   * There is an optional public key can be provided in deploy set in order to substitute one
   * in TVM file.
   *
   * Public key resolving priority:
   * 1. Public key from deploy set.
   * 2. Public key, specified in TVM file.
   * 3. Public key, provided by signer.
   *
   * @param {ParamsOfEncodeMessage} param - parameters
   * @returns ResultOfEncodeMessage
   */
  encode_message(
    params: ParamsOfEncodeMessage
  ): Promise<ResultOfEncodeMessage> {
    return this.tonClient.request("abi.encode_message", params);
  }

  /**
   * Encodes an internal ABI-compatible message
   *
   * @remarks
   * Allows to encode deploy and function call messages.
   *
   * Use cases include messages of any possible type:
   * - deploy with initial function call (i.e. `constructor` or any other function that is used for some kind
   * of initialization);
   * - deploy without initial function call;
   * - simple function call
   *
   * There is an optional public key can be provided in deploy set in order to substitute one
   * in TVM file.
   *
   * Public key resolving priority:
   * 1. Public key from deploy set.
   * 2. Public key, specified in TVM file.
   *
   * @param {ParamsOfEncodeInternalMessage} param - parameters
   * @returns ResultOfEncodeInternalMessage
   */
  encode_internal_message(
    params: ParamsOfEncodeInternalMessage
  ): Promise<ResultOfEncodeInternalMessage> {
    return this.tonClient.request("abi.encode_internal_message", params);
  }

  /**
   * Combines `hex`-encoded `signature` with `base64`-encoded `unsigned_message`. Returns signed message encoded in `base64`.
   *
   * @param {ParamsOfAttachSignature} param - parameters
   * @returns ResultOfAttachSignature
   */
  attach_signature(
    params: ParamsOfAttachSignature
  ): Promise<ResultOfAttachSignature> {
    return this.tonClient.request("abi.attach_signature", params);
  }

  /**
   * Decodes message body using provided message BOC and ABI.
   *
   * @param {ParamsOfDecodeMessage} param - parameters
   * @returns DecodedMessageBody
   */
  decode_message(params: ParamsOfDecodeMessage): Promise<DecodedMessageBody> {
    return this.tonClient.request("abi.decode_message", params);
  }

  /**
   * Decodes message body using provided body BOC and ABI.
   *
   * @param {ParamsOfDecodeMessageBody} param - parameters
   * @returns DecodedMessageBody
   */
  decode_message_body(
    params: ParamsOfDecodeMessageBody
  ): Promise<DecodedMessageBody> {
    return this.tonClient.request("abi.decode_message_body", params);
  }

  /**
   * Creates account state BOC
   *
   * @remarks
   * Creates account state provided with one of these sets of data :
   * 1. BOC of code, BOC of data, BOC of library
   * 2. TVC (string in `base64`), keys, init params
   *
   * @param {ParamsOfEncodeAccount} param - parameters
   * @returns ResultOfEncodeAccount
   */
  encode_account(
    params: ParamsOfEncodeAccount
  ): Promise<ResultOfEncodeAccount> {
    return this.tonClient.request("abi.encode_account", params);
  }

  /**
   * Decodes account data using provided data BOC and ABI.
   *
   * @remarks
   * Note: this feature requires ABI 2.1 or higher.
   *
   * @param {ParamsOfDecodeAccountData} param - parameters
   * @returns ResultOfDecodeData
   */
  decode_account_data(
    params: ParamsOfDecodeAccountData
  ): Promise<ResultOfDecodeData> {
    return this.tonClient.request("abi.decode_account_data", params);
  }

  /**
   * Updates initial account data with initial values for the contract's static variables and owner's public key. This operation is applicable only for initial account data (before deploy). If the contract is already deployed, its data doesn't contain this data section any more.
   *
   * @param {ParamsOfUpdateInitialData} param - parameters
   * @returns ResultOfUpdateInitialData
   */
  update_initial_data(
    params: ParamsOfUpdateInitialData
  ): Promise<ResultOfUpdateInitialData> {
    return this.tonClient.request("abi.update_initial_data", params);
  }

  /**
   * Decodes initial values of a contract's static variables and owner's public key from account initial data This operation is applicable only for initial account data (before deploy). If the contract is already deployed, its data doesn't contain this data section any more.
   *
   * @param {ParamsOfDecodeInitialData} param - parameters
   * @returns ResultOfDecodeInitialData
   */
  decode_initial_data(
    params: ParamsOfDecodeInitialData
  ): Promise<ResultOfDecodeInitialData> {
    return this.tonClient.request("abi.decode_initial_data", params);
  }
}
