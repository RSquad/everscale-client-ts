/**
 * * Pinned - Pin the BOC with `pin` name.
 * 

*/
export type BocCacheType =
  | {
      type: "Pinned";
      pin: string;
    }
  | {
      type: "Unpinned";
    };

export type BocErrorCode =
  | "InvalidBoc"
  | "SerializationError"
  | "InappropriateBlock"
  | "MissingSourceBoc"
  | "InsufficientCacheSize"
  | "BocRefNotFound"
  | "InvalidBocRef";

export type ParamsOfParse = {
  /**
   * boc - BOC encoded as base64
   */
  boc: string;
};

export type ResultOfParse = {
  parsed: any;
};

export type ParamsOfParseShardstate = {
  /**
   * boc - BOC encoded as base64
   */
  boc: string;
  /**
   * id - Shardstate identificator
   */
  id: string;
  /**
   * workchain_id - Workchain shardstate belongs to
   */
  workchain_id: number;
};

export type ParamsOfGetBlockchainConfig = {
  /**
   * block_boc - Key block BOC or zerostate BOC encoded as base64
   */
  block_boc: string;
};

export type ResultOfGetBlockchainConfig = {
  /**
   * config_boc - Blockchain config BOC encoded as base64
   */
  config_boc: string;
};

export type ParamsOfGetBocHash = {
  /**
   * boc - BOC encoded as base64
   */
  boc: string;
};

export type ResultOfGetBocHash = {
  /**
   * hash - BOC root hash encoded with hex
   */
  hash: string;
};

export type ParamsOfGetCodeFromTvc = {
  /**
   * tvc - Contract TVC image encoded as base64
   */
  tvc: string;
};

export type ResultOfGetCodeFromTvc = {
  /**
   * code - Contract code encoded as base64
   */
  code: string;
};

export type ParamsOfBocCacheGet = {
  /**
   * boc_ref - Reference to the cached BOC
   */
  boc_ref: string;
};

export type ResultOfBocCacheGet = {
  /**
   * boc - BOC encoded as base64.
   */
  boc?: string;
};

export type ParamsOfBocCacheSet = {
  /**
   * boc - BOC encoded as base64 or BOC reference
   */
  boc: string;
  cache_type: BocCacheType;
};

export type ResultOfBocCacheSet = {
  /**
   * boc_ref - Reference to the cached BOC
   */
  boc_ref: string;
};

export type ParamsOfBocCacheUnpin = {
  /**
   * pin - Pinned name
   */
  pin: string;
  /**
   * boc_ref - Reference to the cached BOC.
   */
  boc_ref?: string;
};

/**
 * * Integer - Append integer to cell data.
 * 
 * * BitString - Append bit string to cell data.
 * 
 * * Cell - Append ref to nested cells
 * 
 * * CellBoc - Append ref to nested cell
 * 

*/
export type BuilderOp =
  | {
      type: "Integer";
      size: number;
      value: any;
    }
  | {
      type: "BitString";
      value: string;
    }
  | {
      type: "Cell";
      builder: BuilderOp[];
    }
  | {
      type: "CellBoc";
      boc: string;
    };

export type ParamsOfEncodeBoc = {
  /**
   * builder - Cell builder operations.
   */
  builder: BuilderOp[];
  /**
   * boc_cache - Cache type to put the result. The BOC itself returned if no cache type provided.
   */
  boc_cache?: BocCacheType;
};

export type ResultOfEncodeBoc = {
  /**
   * boc - Encoded cell BOC or BOC cache key.
   */
  boc: string;
};
