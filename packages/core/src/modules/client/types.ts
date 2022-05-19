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
  | "InternalError"
  | "InvalidHandle"
  | "LocalStorageError";

export type ClientError = {
  code: number;
  message: string;
  data: any;
};

export type ClientConfig = {
  network?: NetworkConfig;
  crypto?: CryptoConfig;
  abi?: AbiConfig;
  boc?: BocConfig;
  proofs?: ProofsConfig;
  /**
   * local_storage_path - For file based storage is a folder name where SDK will store its data. For browser based is a browser async storage key prefix. Default (recommended) value is "~/.tonclient" for native environments and ".tonclient" for web-browser.
   */
  local_storage_path?: string;
};

export type NetworkConfig = {
  /**
   * server_address - **This field is deprecated, but left for backward-compatibility.** DApp Server public address.
   */
  server_address?: string;
  /**
   * endpoints - List of DApp Server addresses.
   */
  endpoints?: string[];
  /**
   * network_retries_count - Deprecated.
   */
  network_retries_count?: number;
  /**
   * max_reconnect_timeout - Maximum time for sequential reconnections.
   */
  max_reconnect_timeout?: number;
  /**
   * reconnect_timeout - Deprecated
   */
  reconnect_timeout?: number;
  /**
   * message_retries_count - The number of automatic message processing retries that SDK performs in case of `Message Expired (507)` error - but only for those messages which local emulation was successful or failed with replay protection error.
   */
  message_retries_count?: number;
  /**
   * message_processing_timeout - Timeout that is used to process message delivery for the contracts which ABI does not include "expire" header. If the message is not delivered within the specified timeout the appropriate error occurs.
   */
  message_processing_timeout?: number;
  /**
   * wait_for_timeout - Maximum timeout that is used for query response.
   */
  wait_for_timeout?: number;
  /**
   * out_of_sync_threshold - Maximum time difference between server and client.
   */
  out_of_sync_threshold?: number;
  /**
   * sending_endpoint_count - Maximum number of randomly chosen endpoints the library uses to broadcast a message.
   */
  sending_endpoint_count?: number;
  /**
   * latency_detection_interval - Frequency of sync latency detection.
   */
  latency_detection_interval?: number;
  /**
   * max_latency - Maximum value for the endpoint's blockchain data syncronization latency (time-lag). Library periodically checks the current endpoint for blockchain data synchronization latency. If the latency (time-lag) is less then `NetworkConfig.max_latency` then library selects another endpoint.
   */
  max_latency?: number;
  /**
   * query_timeout - Default timeout for http requests.
   */
  query_timeout?: number;
  /**
   * queries_protocol - Queries protocol.
   */
  queries_protocol?: NetworkQueriesProtocol;
  /**
   * first_remp_status_timeout - UNSTABLE.
   */
  first_remp_status_timeout?: number;
  /**
   * next_remp_status_timeout - UNSTABLE.
   */
  next_remp_status_timeout?: number;
  /**
   * access_key - Access key to GraphQL API.
   */
  access_key?: string;
};

export type NetworkQueriesProtocol = "HTTP" | "WS";

export type CryptoConfig = {
  /**
   * mnemonic_dictionary - Mnemonic dictionary that will be used by default in crypto functions. If not specified, 1 dictionary will be used.
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

export type BocConfig = {
  /**
   * cache_max_size - Maximum BOC cache size in kilobytes.
   */
  cache_max_size?: number;
};

export type ProofsConfig = {
  /**
   * cache_in_local_storage - Cache proofs in the local storage.
   */
  cache_in_local_storage?: boolean;
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
 * * Error - Error occurred during request processing
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
