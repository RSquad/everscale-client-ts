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
}
