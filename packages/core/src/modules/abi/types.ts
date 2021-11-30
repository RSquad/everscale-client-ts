import { KeyPair, SigningBoxHandle } from "../crypto/types";
import { BocCacheType } from "../boc/types";

export type AbiErrorCode =
  | "RequiredAddressMissingForEncodeMessage"
  | "RequiredCallSetMissingForEncodeMessage"
  | "InvalidJson"
  | "InvalidMessage"
  | "EncodeDeployMessageFailed"
  | "EncodeRunMessageFailed"
  | "AttachSignatureFailed"
  | "InvalidTvcImage"
  | "RequiredPublicKeyMissingForFunctionHeader"
  | "InvalidSigner"
  | "InvalidAbi"
  | "InvalidFunctionId"
  | "InvalidData"
  | "EncodeInitialDataFailed";

export type Abi =
  | {
      type: "Contract";
      value: AbiContract;
    }
  | {
      type: "Json";
      value: string;
    }
  | {
      type: "Handle";
      value: AbiHandle;
    }
  | {
      type: "Serialized";
      value: AbiContract;
    };

export type AbiHandle = number;

/**
 * Includes several hidden function parameters that contract
 *
 * uses for security, message delivery monitoring and replay protection reasons.
 *
 * The actual set of header fields depends on the contract's ABI.
 *
 * If a contract's ABI does not include some headers, then they are not filled.
 */
export type FunctionHeader = {
  /**
   * expire - Message expiration time in seconds. If not specified - calculated automatically from message_expiration_timeout(), try_index and message_expiration_timeout_grow_factor() (if ABI includes `expire` header).
   */
  expire?: number;
  /**
   * time - Message creation time in milliseconds.
   */
  time?: number;
  /**
   * pubkey - Public key is used by the contract to check the signature.
   */
  pubkey?: string;
};

export type CallSet = {
  /**
   * function_name - Function name that is being called. Or function id encoded as string in hex (starting with 0x).
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

export type DeploySet = {
  /**
   * tvc - Content of TVC file encoded in `base64`.
   */
  tvc: string;
  /**
   * workchain_id - Target workchain for destination address.
   */
  workchain_id?: number;
  /**
   * initial_data - List of initial values for contract's public variables.
   */
  initial_data?: any;
  /**
   * initial_pubkey - Optional public key that can be provided in deploy set in order to substitute one in TVM file or provided by Signer.
   */
  initial_pubkey?: string;
};

/**
 * * None - No keys are provided.
 * 
 * * External - Only public key is provided in unprefixed hex string format to generate unsigned message and `data_to_sign` which can be signed later.
 * 
 * * Keys - Key pair is provided for signing
 * 
 * * SigningBox - Signing Box interface is provided for signing, allows Dapps to sign messages using external APIs, such as HSM, cold wallet, etc.
 * 

*/
export type Signer =
  | {
      type: "None";
    }
  | {
      type: "External";
      public_key: string;
    }
  | {
      type: "Keys";
      keys: KeyPair;
    }
  | {
      type: "SigningBox";
      handle: SigningBoxHandle;
    };

/**
 * InternalOutput - Occurs when contract sends an internal message to other
contract.
*/
export type MessageBodyType = "Input" | "Output" | "InternalOutput" | "Event";

/**
 * * Message - Deploy message.
 * 
 * * StateInit - State init data.
 * 
 * * Tvc - Content of the TVC file.
 * 

*/
export type StateInitSource =
  | {
      type: "Message";
      source: MessageSource;
    }
  | {
      type: "StateInit";
      code: string;
      data: string;
      library?: string;
    }
  | {
      type: "Tvc";
      tvc: string;
      public_key?: string;
      init_params?: StateInitParams;
    };

export type StateInitParams = {
  abi: Abi;
  value: any;
};

export type MessageSource =
  | {
      type: "Encoded";
      message: string;
      abi?: Abi;
    }
  | {
      type: "EncodingParams";
      value: ParamsOfEncodeMessage;
    };

export type AbiParam = {
  name: string;
  type: string;
  components?: AbiParam[];
};

export type AbiEvent = {
  name: string;
  inputs: AbiParam[];
  id?: string;
};

export type AbiData = {
  key: number;
  name: string;
  type: string;
  components?: AbiParam[];
};

export type AbiFunction = {
  name: string;
  inputs: AbiParam[];
  outputs: AbiParam[];
  id?: string;
};

export type AbiContract = {
  "ABI version"?: number;
  abi_version?: number;
  version?: string;
  header?: string[];
  functions?: AbiFunction[];
  events?: AbiEvent[];
  data?: AbiData[];
  fields?: AbiParam[];
};

export type ParamsOfEncodeMessageBody = {
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

export type ResultOfEncodeMessageBody = {
  /**
   * body - Message body BOC encoded with `base64`.
   */
  body: string;
  /**
   * data_to_sign - Optional data to sign.
   */
  data_to_sign?: string;
};

export type ParamsOfAttachSignatureToMessageBody = {
  abi: Abi;
  /**
   * public_key - Public key.
   */
  public_key: string;
  /**
   * message - Unsigned message body BOC.
   */
  message: string;
  /**
   * signature - Signature.
   */
  signature: string;
};

export type ResultOfAttachSignatureToMessageBody = {
  body: string;
};

export type ParamsOfEncodeMessage = {
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

export type ResultOfEncodeMessage = {
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

export type ParamsOfEncodeInternalMessage = {
  /**
   * abi - Contract ABI.
   */
  abi?: Abi;
  /**
   * address - Target address the message will be sent to.
   */
  address?: string;
  /**
   * src_address - Source address of the message.
   */
  src_address?: string;
  /**
   * deploy_set - Deploy parameters.
   */
  deploy_set?: DeploySet;
  /**
   * call_set - Function call parameters.
   */
  call_set?: CallSet;
  /**
   * value - Value in nanotokens to be sent with message.
   */
  value: string;
  /**
   * bounce - Flag of bounceable message.
   */
  bounce?: boolean;
  /**
   * enable_ihr - Enable Instant Hypercube Routing for the message.
   */
  enable_ihr?: boolean;
};

export type ResultOfEncodeInternalMessage = {
  /**
   * message - Message BOC encoded with `base64`.
   */
  message: string;
  /**
   * address - Destination address.
   */
  address: string;
  /**
   * message_id - Message id.
   */
  message_id: string;
};

export type ParamsOfAttachSignature = {
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

export type ResultOfAttachSignature = {
  /**
   * message - Signed message BOC
   */
  message: string;
  /**
   * message_id - Message ID
   */
  message_id: string;
};

export type ParamsOfDecodeMessage = {
  abi: Abi;
  /**
   * message - Message BOC
   */
  message: string;
};

export type DecodedMessageBody = {
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

export type ParamsOfDecodeMessageBody = {
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

export type ParamsOfEncodeAccount = {
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
  /**
   * boc_cache - Cache type to put the result.
   */
  boc_cache?: BocCacheType;
};

export type ResultOfEncodeAccount = {
  /**
   * account - Account BOC encoded in `base64`.
   */
  account: string;
  /**
   * id - Account ID  encoded in `hex`.
   */
  id: string;
};

export type ParamsOfDecodeAccountData = {
  abi: Abi;
  /**
   * data - Data BOC or BOC handle
   */
  data: string;
};

export type ResultOfDecodeAccountData = {
  data: any;
};

export type ParamsOfUpdateInitialData = {
  /**
   * abi - Contract ABI
   */
  abi?: Abi;
  /**
   * data - Data BOC or BOC handle
   */
  data: string;
  /**
   * initial_data - List of initial values for contract's static variables.
   */
  initial_data?: any;
  /**
   * initial_pubkey - Initial account owner's public key to set into account data
   */
  initial_pubkey?: string;
  /**
   * boc_cache - Cache type to put the result. The BOC itself returned if no cache type provided.
   */
  boc_cache?: BocCacheType;
};

export type ResultOfUpdateInitialData = {
  /**
   * data - Updated data BOC or BOC handle
   */
  data: string;
};

export type ParamsOfDecodeInitialData = {
  /**
   * abi - Contract ABI.
   */
  abi?: Abi;
  /**
   * data - Data BOC or BOC handle
   */
  data: string;
};

export type ResultOfDecodeInitialData = {
  /**
   * initial_data - List of initial values of contract's public variables.
   */
  initial_data?: any;
  /**
   * initial_pubkey - Initial account owner's public key
   */
  initial_pubkey: string;
};

export type ParamsOfDecodeBoc = {
  /**
   * params - Parameters to decode from BOC
   */
  params: AbiParam[];
  /**
   * boc - Data BOC or BOC handle
   */
  boc: string;
  allow_partial: boolean;
};

export type ResultOfDecodeBoc = {
  data: any;
};
