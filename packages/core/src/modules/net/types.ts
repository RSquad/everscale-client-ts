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
  | "NoEndpointsProvided"
  | "GraphqlWebsocketInitError"
  | "NetworkModuleResumed";

export type OrderBy = {
  path: string;
  direction: SortDirection;
};

export type SortDirection = "ASC" | "DESC";

export type ParamsOfQueryOperation =
  | {
      type: "QueryCollection";
      value: ParamsOfQueryCollection;
    }
  | {
      type: "WaitForCollection";
      value: ParamsOfWaitForCollection;
    }
  | {
      type: "AggregateCollection";
      value: ParamsOfAggregateCollection;
    }
  | {
      type: "QueryCounterparties";
      value: ParamsOfQueryCounterparties;
    };

export type FieldAggregation = {
  /**
   * field - Dot separated path to the field
   */
  field: string;
  fn: AggregationFn;
};

export type AggregationFn = "COUNT" | "MIN" | "MAX" | "SUM" | "AVERAGE";

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

export type ParamsOfBatchQuery = {
  /**
   * operations - List of query operations that must be performed per single fetch.
   */
  operations: ParamsOfQueryOperation[];
};

export type ResultOfBatchQuery = {
  /**
   * results - Result values for batched queries.
   */
  results: any[];
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

export type ParamsOfAggregateCollection = {
  /**
   * collection - Collection name (accounts, blocks, transactions, messages, block_signatures)
   */
  collection: string;
  /**
   * filter - Collection filter
   */
  filter?: any;
  /**
   * fields - Projection (result) string
   */
  fields?: FieldAggregation[];
};

export type ResultOfAggregateCollection = {
  values: any;
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

export type ParamsOfQueryCounterparties = {
  /**
   * account - Account address
   */
  account: string;
  /**
   * result - Projection (result) string
   */
  result: string;
  /**
   * first - Number of counterparties to return
   */
  first?: number;
  /**
   * after - `cursor` field of the last received result
   */
  after?: string;
};
