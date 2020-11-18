import { KeyPair, SigningBoxHandle } from "../crypto/types";
export declare type Abi = {
    type: "Contract";
    value: AbiContract;
} | {
    type: "Handle";
    value: AbiHandle;
};
export declare type AbiHandle = number;
/**
 * The ABI function header.
 *
 * Includes several hidden function parameters that contract
 *
 * uses for security and replay protection reasons.
 *
 * The actual set of header fields depends on the contract's ABI.
 */
export declare type FunctionHeader = {
    /**
     * expire - Message expiration time in seconds.
     */
    expire?: number;
    /**
     * time - Message creation time in milliseconds.
     */
    time?: number;
    /**
     * pubkey - Public key used to sign message. Encoded with `hex`.
     */
    pubkey?: string;
};
export declare type CallSet = {
    /**
     * function_name - Function name that is being called.
     */
    function_name: string;
    /**
     * header - Function header.
     */
    header?: FunctionHeader;
    /**
     * input - Function input parameters according to ABI.
     */
    input?: any;
};
export declare type DeploySet = {
    /**
     * tvc - Content of TVC file encoded in `base64`.
     */
    tvc: string;
    /**
     * workchain_id - Target workchain for destination address. Default is `0`.
     */
    workchain_id?: number;
    /**
     * initial_data - List of initial values for contract's public variables.
     */
    initial_data?: any;
};
/**
 * * None - No keys are provided. Creates an unsigned message.
 *
 * * External - Only public key is provided to generate unsigned message and `data_to_sign`
 *
 * * Keys - Key pair is provided for signing
 *
 * * SigningBox - Signing Box interface is provided for signing, allows Dapps to sign messages using external APIs,
 *

*/
export declare type Signer = {
    type: "None";
} | {
    type: "External";
    public_key: string;
} | {
    type: "Keys";
    keys: KeyPair;
} | {
    type: "SigningBox";
    handle: SigningBoxHandle;
};
/**
 * Input -  Message contains the input of the ABI function.
 *
 * Output -  Message contains the output of the ABI function.
 *
 * InternalOutput -  Message contains the input of the imported ABI function.

 Occurs when contract sends an internal message to other
 contract.
 *
 * Event -  Message contains the input of the ABI event.
*/
export declare type MessageBodyType = "Input" | "Output" | "InternalOutput" | "Event";
/**
 * * Message - Deploy message.
 *
 * * StateInit - State init data.
 *
 * * Tvc - Content of the TVC file. Encoded in `base64`.
 *

*/
export declare type StateInitSource = {
    type: "Message";
    source: MessageSource;
} | {
    type: "StateInit";
    code: string;
    data: string;
    library?: string;
} | {
    type: "Tvc";
    tvc: string;
    public_key?: string;
    init_params?: StateInitParams;
};
export declare type StateInitParams = {
    abi: Abi;
    value: any;
};
export declare type MessageSource = {
    type: "Encoded";
    message: string;
    abi?: Abi;
} | {
    type: "EncodingParams";
    value: ParamsOfEncodeMessage;
};
export declare type AbiParam = {
    name: string;
    type: string;
    components?: AbiParam[];
};
export declare type AbiEvent = {
    name: string;
    inputs: AbiParam[];
    id?: number;
};
export declare type AbiData = {
    key: number;
    name: string;
    type: string;
    components?: AbiParam[];
};
export declare type AbiFunction = {
    name: string;
    inputs: AbiParam[];
    outputs: AbiParam[];
    id?: number;
};
export declare type AbiContract = {
    "ABI version": number;
    header?: string[];
    functions?: AbiFunction[];
    events?: AbiEvent[];
    data?: AbiData[];
};
export declare type ParamsOfEncodeMessageBody = {
    abi: Abi;
    call_set: CallSet;
    /**
     * is_internal - True if internal message body must be encoded.
     */
    is_internal: boolean;
    signer: Signer;
    /**
     * processing_try_index - Processing try index.
     */
    processing_try_index?: number;
};
export declare type ResultOfEncodeMessageBody = {
    /**
     * body - Message body BOC encoded with `base64`.
     */
    body: string;
    /**
     * data_to_sign - Optional data to sign. Encoded with `base64`.
     */
    data_to_sign?: string;
};
export declare type ParamsOfAttachSignatureToMessageBody = {
    abi: Abi;
    /**
     * public_key - Public key. Must be encoded with `hex`.
     */
    public_key: string;
    /**
     * message - Unsigned message BOC. Must be encoded with `base64`.
     */
    message: string;
    /**
     * signature - Signature. Must be encoded with `hex`.
     */
    signature: string;
};
export declare type ResultOfAttachSignatureToMessageBody = {
    body: string;
};
export declare type ParamsOfEncodeMessage = {
    abi: Abi;
    /**
     * address - Target address the message will be sent to.
     */
    address?: string;
    /**
     * deploy_set - Deploy parameters.
     */
    deploy_set?: DeploySet;
    /**
     * call_set - Function call parameters.
     */
    call_set?: CallSet;
    signer: Signer;
    /**
     * processing_try_index - Processing try index.
     */
    processing_try_index?: number;
};
export declare type ResultOfEncodeMessage = {
    /**
     * message - Message BOC encoded with `base64`.
     */
    message: string;
    /**
     * data_to_sign - Optional data to be signed encoded in `base64`.
     */
    data_to_sign?: string;
    /**
     * address - Destination address.
     */
    address: string;
    /**
     * message_id - Message id.
     */
    message_id: string;
};
export declare type ParamsOfAttachSignature = {
    abi: Abi;
    /**
     * public_key - Public key encoded in `hex`.
     */
    public_key: string;
    /**
     * message - Unsigned message BOC encoded in `base64`.
     */
    message: string;
    /**
     * signature - Signature encoded in `hex`.
     */
    signature: string;
};
export declare type ResultOfAttachSignature = {
    /**
     * message - Signed message BOC
     */
    message: string;
    /**
     * message_id - Message ID
     */
    message_id: string;
};
export declare type ParamsOfDecodeMessage = {
    abi: Abi;
    /**
     * message - Message BOC
     */
    message: string;
};
export declare type DecodedMessageBody = {
    body_type: MessageBodyType;
    /**
     * name - Function or event name.
     */
    name: string;
    /**
     * value - Parameters or result value.
     */
    value?: any;
    /**
     * header - Function header.
     */
    header?: FunctionHeader;
};
export declare type ParamsOfDecodeMessageBody = {
    abi: Abi;
    /**
     * body - Message body BOC encoded in `base64`.
     */
    body: string;
    /**
     * is_internal - True if the body belongs to the internal message.
     */
    is_internal: boolean;
};
export declare type ParamsOfEncodeAccount = {
    state_init: StateInitSource;
    /**
     * balance - Initial balance.
     */
    balance?: number;
    /**
     * last_trans_lt - Initial value for the `last_trans_lt`.
     */
    last_trans_lt?: number;
    /**
     * last_paid - Initial value for the `last_paid`.
     */
    last_paid?: number;
};
export declare type ResultOfEncodeAccount = {
    /**
     * account - Account BOC encoded in `base64`.
     */
    account: string;
    /**
     * id - Account ID  encoded in `hex`.
     */
    id: string;
};
