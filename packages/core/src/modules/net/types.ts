export type NetErrorCode =
  | "QueryFailed"
  | "SubscribeFailed"
  | "WaitForFailed"
  | "GetSubscriptionResultFailed"
  | "InvalidServerResponse"
  | "ClockOutOfSync"
  | "WaitForTimeout"
  | "GraphqlError"
  | "NetworkModuleSuspended"
  | "WebsocketDisconnected"
  | "NotSupported"
  | "NoEndpointsProvided";

export type OrderBy = {
  path: string;
  direction: SortDirection;
};

export type SortDirection = "ASC" | "DESC";

export type ParamsOfQuery = {
  /**
   * query - GraphQL query text.
   */
  query: string;
  /**
   * variables - Variables used in query.
   */
  variables?: any;
};

export type ResultOfQuery = {
  result: any;
};

export type ParamsOfQueryCollection = {
  /**
   * collection - Collection name (accounts, blocks, transactions, messages, block_signatures)
   */
  collection: string;
  /**
   * filter - Collection filter
   */
  filter?: any;
  /**
   * result - Projection (result) string
   */
  result: string;
  /**
   * order - Sorting order
   */
  order?: OrderBy[];
  /**
   * limit - Number of documents to return
   */
  limit?: number;
};

export type ResultOfQueryCollection = {
  /**
   * result - Objects that match the provided criteria
   */
  result: any[];
};

export type ParamsOfWaitForCollection = {
  /**
   * collection - Collection name (accounts, blocks, transactions, messages, block_signatures)
   */
  collection: string;
  /**
   * filter - Collection filter
   */
  filter?: any;
  /**
   * result - Projection (result) string
   */
  result: string;
  /**
   * timeout - Query timeout
   */
  timeout?: number;
};

export type ResultOfWaitForCollection = {
  result: any;
};

export type ResultOfSubscribeCollection = {
  /**
   * handle - Subscription handle.
   */
  handle: number;
};

export type ParamsOfSubscribeCollection = {
  /**
   * collection - Collection name (accounts, blocks, transactions, messages, block_signatures)
   */
  collection: string;
  /**
   * filter - Collection filter
   */
  filter?: any;
  /**
   * result - Projection (result) string
   */
  result: string;
};

export type ParamsOfFindLastShardBlock = {
  /**
   * address - Account address
   */
  address: string;
};

export type ResultOfFindLastShardBlock = {
  /**
   * block_id - Account shard last block ID
   */
  block_id: string;
};

export type EndpointsSet = {
  /**
   * endpoints - List of endpoints provided by server
   */
  endpoints: string[];
};
