export declare type ParamsOfParse = {
    /**
     * boc - BOC encoded as base64
     */
    boc: string;
};
export declare type ResultOfParse = {
    parsed: any;
};
export declare type ParamsOfParseShardstate = {
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
export declare type ParamsOfGetBlockchainConfig = {
    /**
     * block_boc - Key block BOC encoded as base64
     */
    block_boc: string;
};
export declare type ResultOfGetBlockchainConfig = {
    /**
     * config_boc - Blockchain config BOC encoded as base64
     */
    config_boc: string;
};
