export type ClientErrorCode =
  | "NotImplemented"
  | "InvalidHex"
  | "InvalidBase64"
  | "InvalidAddress"
  | "CallbackParamsCantBeConvertedToJson"
  | "WebsocketConnectError"
  | "WebsocketReceiveError"
  | "WebsocketSendError"
  | "HttpClientCreateError"
  | "HttpRequestCreateError"
  | "HttpRequestSendError"
  | "HttpRequestParseError"
  | "CallbackNotRegistered"
  | "NetModuleNotInit"
  | "InvalidConfig"
  | "CannotCreateRuntime"
  | "InvalidContextHandle"
  | "CannotSerializeResult"
  | "CannotSerializeError"
  | "CannotConvertJsValueToJson"
  | "CannotReceiveSpawnedResult"
  | "SetTimerError"
  | "InvalidParams"
  | "ContractsAddressConversionFailed"
  | "UnknownFunction"
  | "AppRequestError"
  | "NoSuchRequest"
  | "CanNotSendRequestResult"
  | "CanNotReceiveRequestResult"
  | "CanNotParseRequestResult"
  | "UnexpectedCallbackResponse"
  | "CanNotParseNumber"
  | "InternalError";

export type ClientError = {
  code: number;
  message: string;
  data: any;
};

export type ClientConfig = {
  network?: NetworkConfig;
  crypto?: CryptoConfig;
  abi?: AbiConfig;
};

export type NetworkConfig = {
  /**
   * server_address - DApp Server public address. For instance, for `net.ton.dev/graphql` GraphQL endpoint the server address will be net.ton.dev
   */
  server_address?: string;
  /**
   * endpoints - List of DApp Server addresses.
   */
  endpoints?: string[];
  /**
   * network_retries_count - The number of automatic network retries that SDK performs in case of connection problems The default value is 5.
   */
  network_retries_count?: number;
  /**
   * message_retries_count - The number of automatic message processing retries that SDK performs in case of `Message Expired (507)` error - but only for those messages which local emulation was successfull or failed with replay protection error. The default value is 5.
   */
  message_retries_count?: number;
  /**
   * message_processing_timeout - Timeout that is used to process message delivery for the contracts which ABI does not include "expire" header. If the message is not delivered within the speficied timeout the appropriate error occurs.
   */
  message_processing_timeout?: number;
  /**
   * wait_for_timeout - Maximum timeout that is used for query response. The default value is 40 sec.
   */
  wait_for_timeout?: number;
  /**
   * out_of_sync_threshold - Maximum time difference between server and client.
   */
  out_of_sync_threshold?: number;
  /**
   * reconnect_timeout - Timeout between reconnect attempts
   */
  reconnect_timeout?: number;
  /**
   * access_key - Access key to GraphQL API.
   */
  access_key?: string;
};

export type CryptoConfig = {
  /**
   * mnemonic_dictionary - Mnemonic dictionary that will be used by default in crypto funcions. If not specified, 1 dictionary will be used.
   */
  mnemonic_dictionary?: number;
  /**
   * mnemonic_word_count - Mnemonic word count that will be used by default in crypto functions. If not specified the default value will be 12.
   */
  mnemonic_word_count?: number;
  /**
   * hdkey_derivation_path - Derivation path that will be used by default in crypto functions. If not specified `m/44'/396'/0'/0/0` will be used.
   */
  hdkey_derivation_path?: string;
};

export type AbiConfig = {
  /**
   * workchain - Workchain id that is used by default in DeploySet
   */
  workchain?: number;
  /**
   * message_expiration_timeout - Message lifetime for contracts which ABI includes "expire" header. The default value is 40 sec.
   */
  message_expiration_timeout?: number;
  /**
   * message_expiration_timeout_grow_factor - Factor that increases the expiration timeout for each retry The default value is 1.5
   */
  message_expiration_timeout_grow_factor?: number;
};

export type BuildInfoDependency = {
  /**
   * name - Dependency name.
   */
  name: string;
  /**
   * git_commit - Git commit hash of the related repository.
   */
  git_commit: string;
};

export type ParamsOfAppRequest = {
  /**
   * app_request_id - Request ID.
   */
  app_request_id: number;
  request_data: any;
};

/**
 * * Error - Error occured during request processing
 * 
 * * Ok - Request processed successfully
 * 

*/
export type AppRequestResult =
  | {
      type: "Error";
      text: string;
    }
  | {
      type: "Ok";
      result: any;
    };

export type ResultOfGetApiReference = {
  api: any;
};

export type ResultOfVersion = {
  /**
   * version - Core Library version
   */
  version: string;
};

export type ResultOfBuildInfo = {
  /**
   * build_number - Build number assigned to this build by the CI.
   */
  build_number: number;
  /**
   * dependencies - Fingerprint of the most important dependencies.
   */
  dependencies: BuildInfoDependency[];
};

export type ParamsOfResolveAppRequest = {
  /**
   * app_request_id - Request ID received from SDK
   */
  app_request_id: number;
  result: AppRequestResult;
};
