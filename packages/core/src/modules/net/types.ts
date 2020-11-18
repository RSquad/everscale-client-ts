export type OrderBy = {
  path: string;
  direction: SortDirection;
};

export type SortDirection = "ASC" | "DESC";

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
   * handle - Subscription handle. Must be closed with `unsubscribe`
   */
  handle: number;
};

export type unit = void;

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
