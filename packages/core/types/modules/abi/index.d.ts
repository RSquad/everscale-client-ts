import { TonClient } from "../..";
import { ParamsOfEncodeMessageBody, ResultOfEncodeMessageBody, ParamsOfAttachSignatureToMessageBody, ResultOfAttachSignatureToMessageBody, ParamsOfEncodeMessage, ResultOfEncodeMessage, ParamsOfAttachSignature, ResultOfAttachSignature, ParamsOfDecodeMessage, DecodedMessageBody, ParamsOfDecodeMessageBody, ParamsOfEncodeAccount, ResultOfEncodeAccount } from "./types";
/**
 * Provides message encoding and decoding according to the ABI
 *
 * @remarks
 * Provides message encoding and decoding according to the ABI
 * specification.
 */
export declare class AbiModule {
    tonClient: TonClient;
    constructor(tonClient: TonClient);
    /**
     * Encodes message body according to ABI function call.
     *
     * @remarks
     * Encodes message body according to ABI function call.
     *
     * @param {ParamsOfEncodeMessageBody} param - parameters
     * @returns ResultOfEncodeMessageBody
     */
    encode_message_body(params: ParamsOfEncodeMessageBody): Promise<ResultOfEncodeMessageBody>;
    attach_signature_to_message_body(params: ParamsOfAttachSignatureToMessageBody): Promise<ResultOfAttachSignatureToMessageBody>;
    /**
     * Encodes an ABI-compatible message
     *
     * @remarks
     * Encodes an ABI-compatible message
     *
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
     * [SOON] `Signer::SigningBox` Allows using a special interface to imlepement signing
     * without private key disclosure to SDK. For instance, in case of using a cold wallet or HSM,
     * when application calls some API to sign data.
     *
     * @param {ParamsOfEncodeMessage} param - parameters
     * @returns ResultOfEncodeMessage
     */
    encode_message(params: ParamsOfEncodeMessage): Promise<ResultOfEncodeMessage>;
    /**
     * Combines `hex`-encoded `signature` with `base64`-encoded `unsigned_message`.
     *
     * @remarks
     * Combines `hex`-encoded `signature` with `base64`-encoded `unsigned_message`.
     * Returns signed message encoded in `base64`.
     *
     * @param {ParamsOfAttachSignature} param - parameters
     * @returns ResultOfAttachSignature
     */
    attach_signature(params: ParamsOfAttachSignature): Promise<ResultOfAttachSignature>;
    /**
     * Decodes message body using provided message BOC and ABI.
     *
     * @remarks
     * Decodes message body using provided message BOC and ABI.
     *
     * @param {ParamsOfDecodeMessage} param - parameters
     * @returns DecodedMessageBody
     */
    decode_message(params: ParamsOfDecodeMessage): Promise<DecodedMessageBody>;
    /**
     * Decodes message body using provided body BOC and ABI.
     *
     * @remarks
     * Decodes message body using provided body BOC and ABI.
     *
     * @param {ParamsOfDecodeMessageBody} param - parameters
     * @returns DecodedMessageBody
     */
    decode_message_body(params: ParamsOfDecodeMessageBody): Promise<DecodedMessageBody>;
    /**
     * Creates account state BOC
     *
     * @remarks
     * Creates account state BOC
     *
     * Creates account state provided with one of these sets of data :
     * 1. BOC of code, BOC of data, BOC of library
     * 2. TVC (string in `base64`), keys, init params
     *
     * @param {ParamsOfEncodeAccount} param - parameters
     * @returns ResultOfEncodeAccount
     */
    encode_account(params: ParamsOfEncodeAccount): Promise<ResultOfEncodeAccount>;
}
