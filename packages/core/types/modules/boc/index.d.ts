import { TonClient } from "../..";
import { ParamsOfParse, ResultOfParse, ParamsOfParseShardstate, ParamsOfGetBlockchainConfig, ResultOfGetBlockchainConfig } from "./types";
/**
 * BOC manipulation module.
 *
 * @remarks
 * BOC manipulation module.
 */
export declare class BocModule {
    tonClient: TonClient;
    constructor(tonClient: TonClient);
    /**
     * Parses message boc into a JSON
     *
     * @remarks
     * Parses message boc into a JSON
     *
     * JSON structure is compatible with GraphQL API message object
     *
     * @param {ParamsOfParse} param - parameters
     * @returns ResultOfParse
     */
    parse_message(params: ParamsOfParse): Promise<ResultOfParse>;
    /**
     * Parses transaction boc into a JSON
     *
     * @remarks
     * Parses transaction boc into a JSON
     *
     * JSON structure is compatible with GraphQL API transaction object
     *
     * @param {ParamsOfParse} param - parameters
     * @returns ResultOfParse
     */
    parse_transaction(params: ParamsOfParse): Promise<ResultOfParse>;
    /**
     * Parses account boc into a JSON
     *
     * @remarks
     * Parses account boc into a JSON
     *
     * JSON structure is compatible with GraphQL API account object
     *
     * @param {ParamsOfParse} param - parameters
     * @returns ResultOfParse
     */
    parse_account(params: ParamsOfParse): Promise<ResultOfParse>;
    /**
     * Parses block boc into a JSON
     *
     * @remarks
     * Parses block boc into a JSON
     *
     * JSON structure is compatible with GraphQL API block object
     *
     * @param {ParamsOfParse} param - parameters
     * @returns ResultOfParse
     */
    parse_block(params: ParamsOfParse): Promise<ResultOfParse>;
    /**
     * Parses shardstate boc into a JSON
     *
     * @remarks
     * Parses shardstate boc into a JSON
     *
     * JSON structure is compatible with GraphQL API shardstate object
     *
     * @param {ParamsOfParseShardstate} param - parameters
     * @returns ResultOfParse
     */
    parse_shardstate(params: ParamsOfParseShardstate): Promise<ResultOfParse>;
    get_blockchain_config(params: ParamsOfGetBlockchainConfig): Promise<ResultOfGetBlockchainConfig>;
}
