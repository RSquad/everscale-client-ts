import { TonClient } from "../..";
import {
  ParamsOfParse,
  ResultOfParse,
  ParamsOfParseShardstate,
  ParamsOfGetBlockchainConfig,
  ResultOfGetBlockchainConfig,
  ParamsOfGetBocHash,
  ResultOfGetBocHash,
  ParamsOfGetCodeFromTvc,
  ResultOfGetCodeFromTvc,
  ParamsOfBocCacheGet,
  ResultOfBocCacheGet,
  ParamsOfBocCacheSet,
  ResultOfBocCacheSet,
  ParamsOfBocCacheUnpin,
  ParamsOfEncodeBoc,
  ResultOfEncodeBoc,
} from "./types";

/**
 * BOC manipulation module.
 */
export class BocModule {
  tonClient: TonClient;
  constructor(tonClient: TonClient) {
    this.tonClient = tonClient;
  }

  /**
   * Parses message boc into a JSON
   *
   * @remarks
   * JSON structure is compatible with GraphQL API message object
   *
   * @param {ParamsOfParse} param - parameters
   * @returns ResultOfParse
   */
  parse_message(params: ParamsOfParse): Promise<ResultOfParse> {
    return this.tonClient.request("boc.parse_message", params);
  }

  /**
   * Parses transaction boc into a JSON
   *
   * @remarks
   * JSON structure is compatible with GraphQL API transaction object
   *
   * @param {ParamsOfParse} param - parameters
   * @returns ResultOfParse
   */
  parse_transaction(params: ParamsOfParse): Promise<ResultOfParse> {
    return this.tonClient.request("boc.parse_transaction", params);
  }

  /**
   * Parses account boc into a JSON
   *
   * @remarks
   * JSON structure is compatible with GraphQL API account object
   *
   * @param {ParamsOfParse} param - parameters
   * @returns ResultOfParse
   */
  parse_account(params: ParamsOfParse): Promise<ResultOfParse> {
    return this.tonClient.request("boc.parse_account", params);
  }

  /**
   * Parses block boc into a JSON
   *
   * @remarks
   * JSON structure is compatible with GraphQL API block object
   *
   * @param {ParamsOfParse} param - parameters
   * @returns ResultOfParse
   */
  parse_block(params: ParamsOfParse): Promise<ResultOfParse> {
    return this.tonClient.request("boc.parse_block", params);
  }

  /**
   * Parses shardstate boc into a JSON
   *
   * @remarks
   * JSON structure is compatible with GraphQL API shardstate object
   *
   * @param {ParamsOfParseShardstate} param - parameters
   * @returns ResultOfParse
   */
  parse_shardstate(params: ParamsOfParseShardstate): Promise<ResultOfParse> {
    return this.tonClient.request("boc.parse_shardstate", params);
  }

  /**
   * Extract blockchain configuration from key block and also from zerostate.
   *
   * @param {ParamsOfGetBlockchainConfig} param - parameters
   * @returns ResultOfGetBlockchainConfig
   */
  get_blockchain_config(
    params: ParamsOfGetBlockchainConfig
  ): Promise<ResultOfGetBlockchainConfig> {
    return this.tonClient.request("boc.get_blockchain_config", params);
  }

  /**
   * Calculates BOC root hash
   *
   * @param {ParamsOfGetBocHash} param - parameters
   * @returns ResultOfGetBocHash
   */
  get_boc_hash(params: ParamsOfGetBocHash): Promise<ResultOfGetBocHash> {
    return this.tonClient.request("boc.get_boc_hash", params);
  }

  /**
   * Extracts code from TVC contract image
   *
   * @param {ParamsOfGetCodeFromTvc} param - parameters
   * @returns ResultOfGetCodeFromTvc
   */
  get_code_from_tvc(
    params: ParamsOfGetCodeFromTvc
  ): Promise<ResultOfGetCodeFromTvc> {
    return this.tonClient.request("boc.get_code_from_tvc", params);
  }

  /**
   * Get BOC from cache
   *
   * @param {ParamsOfBocCacheGet} param - parameters
   * @returns ResultOfBocCacheGet
   */
  cache_get(params: ParamsOfBocCacheGet): Promise<ResultOfBocCacheGet> {
    return this.tonClient.request("boc.cache_get", params);
  }

  /**
   * Save BOC into cache
   *
   * @param {ParamsOfBocCacheSet} param - parameters
   * @returns ResultOfBocCacheSet
   */
  cache_set(params: ParamsOfBocCacheSet): Promise<ResultOfBocCacheSet> {
    return this.tonClient.request("boc.cache_set", params);
  }

  /**
   * Unpin BOCs with specified pin.
   *
   * @remarks
   * BOCs which don't have another pins will be removed from cache
   *
   * @param {ParamsOfBocCacheUnpin} param - parameters
   */
  cache_unpin(params: ParamsOfBocCacheUnpin): Promise<undefined> {
    return this.tonClient.request("boc.cache_unpin", params);
  }

  /**
   * Encodes BOC from builder operations.
   *
   * @param {ParamsOfEncodeBoc} param - parameters
   * @returns ResultOfEncodeBoc
   */
  encode_boc(params: ParamsOfEncodeBoc): Promise<ResultOfEncodeBoc> {
    return this.tonClient.request("boc.encode_boc", params);
  }
}
