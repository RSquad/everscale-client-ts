import { DecodedMessageBody, Abi } from "../abi/types";

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

export type TransactionNode = {
  /**
   * id - Transaction id.
   */
  id: string;
  /**
   * in_msg - In message id.
   */
  in_msg: string;
  /**
   * out_msgs - Out message ids.
   */
  out_msgs: string[];
  /**
   * account_addr - Account address.
   */
  account_addr: string;
  /**
   * total_fees - Transactions total fees.
   */
  total_fees: string;
  /**
   * aborted - Aborted flag.
   */
  aborted: boolean;
  /**
   * exit_code - Compute phase exit code.
   */
  exit_code?: number;
};

export type MessageNode = {
  /**
   * id - Message id.
   */
  id: string;
  /**
   * src_transaction_id - Source transaction id.
   */
  src_transaction_id?: string;
  /**
   * dst_transaction_id - Destination transaction id.
   */
  dst_transaction_id?: string;
  /**
   * src - Source address.
   */
  src?: string;
  /**
   * dst - Destination address.
   */
  dst?: string;
  /**
   * value - Transferred tokens value.
   */
  value?: string;
  /**
   * bounce - Bounce flag.
   */
  bounce: boolean;
  /**
   * decoded_body - Decoded body.
   */
  decoded_body?: DecodedMessageBody;
};

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

export type ResultOfGetEndpoints = {
  /**
   * query - Current query endpoint
   */
  query: string;
  /**
   * endpoints - List of all endpoints used by client
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

export type ParamsOfQueryTransactionTree = {
  /**
   * in_msg - Input message id.
   */
  in_msg: string;
  /**
   * abi_registry - List of contract ABIs that will be used to decode message bodies. Library will try to decode each returned message body using any ABI from the registry.
   */
  abi_registry?: Abi[];
  /**
   * timeout - Timeout used to limit waiting time for the missing messages and transaction.
   */
  timeout?: number;
};

export type ResultOfQueryTransactionTree = {
  /**
   * messages - Messages.
   */
  messages: MessageNode[];
  /**
   * transactions - Transactions.
   */
  transactions: TransactionNode[];
};

export type ParamsOfCreateBlockIterator = {
  /**
   * start_time - Starting time to iterate from.
   */
  start_time?: number;
  /**
   * end_time - Optional end time to iterate for.
   */
  end_time?: number;
  /**
   * shard_filter - Shard prefix filter.
   */
  shard_filter?: string[];
  /**
   * result - Projection (result) string.
   */
  result?: string;
};

export type RegisteredIterator = {
  /**
   * handle - Iterator handle.
   */
  handle: number;
};

export type ParamsOfResumeBlockIterator = {
  resume_state: any;
};

export type ParamsOfCreateTransactionIterator = {
  /**
   * start_time - Starting time to iterate from.
   */
  start_time?: number;
  /**
   * end_time - Optional end time to iterate for.
   */
  end_time?: number;
  /**
   * shard_filter - Shard prefix filters.
   */
  shard_filter?: string[];
  /**
   * accounts_filter - Account address filter.
   */
  accounts_filter?: string[];
  /**
   * result - Projection (result) string.
   */
  result?: string;
  /**
   * include_transfers - Include `transfers` field in iterated transactions.
   */
  include_transfers?: boolean;
};

export type ParamsOfResumeTransactionIterator = {
  resume_state: any;
  /**
   * accounts_filter - Account address filter.
   */
  accounts_filter?: string[];
};

export type ParamsOfIteratorNext = {
  /**
   * iterator - Iterator handle
   */
  iterator: number;
  /**
   * limit - Maximum count of the returned items.
   */
  limit?: number;
  /**
   * return_resume_state - Indicates that function must return the iterator state that can be used for resuming iteration.
   */
  return_resume_state?: boolean;
};

export type ResultOfIteratorNext = {
  /**
   * items - Next available items.
   */
  items: any[];
  /**
   * has_more - Indicates that there are more available items in iterated range.
   */
  has_more: boolean;
  /**
   * resume_state - Optional iterator state that can be used for resuming iteration.
   */
  resume_state?: any;
};
