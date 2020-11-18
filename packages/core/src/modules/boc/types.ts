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
   * block_boc - Key block BOC encoded as base64
   */
  block_boc: string;
};

export type ResultOfGetBlockchainConfig = {
  /**
   * config_boc - Blockchain config BOC encoded as base64
   */
  config_boc: string;
};
