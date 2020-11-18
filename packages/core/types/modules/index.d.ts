import { TonClient, ResponseHandler } from "..";
export declare type ClientError = {
    code: number;
    message: string;
    data: any;
};
export declare type ClientConfig = {
    network?: NetworkConfig;
    crypto?: CryptoConfig;
    abi?: AbiConfig;
};
export declare type NetworkConfig = {
    server_address: string;
    network_retries_count?: number;
    message_retries_count?: number;
    message_processing_timeout?: number;
    wait_for_timeout?: number;
    out_of_sync_threshold?: bigint;
    access_key?: string;
};
export declare type CryptoConfig = {
    mnemonic_dictionary?: number;
    mnemonic_word_count?: number;
    hdkey_derivation_path?: string;
    hdkey_compliant?: boolean;
};
export declare type AbiConfig = {
    workchain?: number;
    message_expiration_timeout?: number;
    message_expiration_timeout_grow_factor?: number;
};
export declare type BuildInfoDependency = {
    name: string;
    git_commit: string;
};
export declare type ResultOfGetApiReference = {
    api: any;
};
export declare type ResultOfVersion = {
    version: string;
};
export declare type ResultOfBuildInfo = {
    build_number: number;
    dependencies: BuildInfoDependency[];
};
export declare type SigningBoxHandle = number;
export declare type ParamsOfFactorize = {
    composite: string;
};
export declare type ResultOfFactorize = {
    factors: string[];
};
export declare type ParamsOfModularPower = {
    base: string;
    exponent: string;
    modulus: string;
};
export declare type ResultOfModularPower = {
    modular_power: string;
};
export declare type ParamsOfTonCrc16 = {
    data: string;
};
export declare type ResultOfTonCrc16 = {
    crc: number;
};
export declare type ParamsOfGenerateRandomBytes = {
    length: number;
};
export declare type ResultOfGenerateRandomBytes = {
    bytes: string;
};
export declare type ParamsOfConvertPublicKeyToTonSafeFormat = {
    public_key: string;
};
export declare type ResultOfConvertPublicKeyToTonSafeFormat = {
    ton_public_key: string;
};
export declare type KeyPair = {
    public: string;
    secret: string;
};
export declare type ParamsOfSign = {
    unsigned: string;
    keys: KeyPair;
};
export declare type ResultOfSign = {
    signed: string;
    signature: string;
};
export declare type ParamsOfVerifySignature = {
    signed: string;
    public: string;
};
export declare type ResultOfVerifySignature = {
    unsigned: string;
};
export declare type ParamsOfHash = {
    data: string;
};
export declare type ResultOfHash = {
    hash: string;
};
export declare type ParamsOfScrypt = {
    password: string;
    salt: string;
    log_n: number;
    r: number;
    p: number;
    dk_len: number;
};
export declare type ResultOfScrypt = {
    key: string;
};
export declare type ParamsOfNaclSignKeyPairFromSecret = {
    secret: string;
};
export declare type ParamsOfNaclSign = {
    unsigned: string;
    secret: string;
};
export declare type ResultOfNaclSign = {
    signed: string;
};
export declare type ParamsOfNaclSignOpen = {
    signed: string;
    public: string;
};
export declare type ResultOfNaclSignOpen = {
    unsigned: string;
};
export declare type ResultOfNaclSignDetached = {
    signature: string;
};
export declare type ParamsOfNaclBoxKeyPairFromSecret = {
    secret: string;
};
export declare type ParamsOfNaclBox = {
    decrypted: string;
    nonce: string;
    their_public: string;
    secret: string;
};
export declare type ResultOfNaclBox = {
    encrypted: string;
};
export declare type ParamsOfNaclBoxOpen = {
    encrypted: string;
    nonce: string;
    their_public: string;
    secret: string;
};
export declare type ResultOfNaclBoxOpen = {
    decrypted: string;
};
export declare type ParamsOfNaclSecretBox = {
    decrypted: string;
    nonce: string;
    key: string;
};
export declare type ParamsOfNaclSecretBoxOpen = {
    encrypted: string;
    nonce: string;
    key: string;
};
export declare type ParamsOfMnemonicWords = {
    dictionary?: number;
};
export declare type ResultOfMnemonicWords = {
    words: string;
};
export declare type ParamsOfMnemonicFromRandom = {
    dictionary?: number;
    word_count?: number;
};
export declare type ResultOfMnemonicFromRandom = {
    phrase: string;
};
export declare type ParamsOfMnemonicFromEntropy = {
    entropy: string;
    dictionary?: number;
    word_count?: number;
};
export declare type ResultOfMnemonicFromEntropy = {
    phrase: string;
};
export declare type ParamsOfMnemonicVerify = {
    phrase: string;
    dictionary?: number;
    word_count?: number;
};
export declare type ResultOfMnemonicVerify = {
    valid: boolean;
};
export declare type ParamsOfMnemonicDeriveSignKeys = {
    phrase: string;
    path?: string;
    dictionary?: number;
    word_count?: number;
};
export declare type ParamsOfHDKeyXPrvFromMnemonic = {
    phrase: string;
    dictionary?: number;
    word_count?: number;
};
export declare type ResultOfHDKeyXPrvFromMnemonic = {
    xprv: string;
};
export declare type ParamsOfHDKeyDeriveFromXPrv = {
    xprv: string;
    child_index: number;
    hardened: boolean;
};
export declare type ResultOfHDKeyDeriveFromXPrv = {
    xprv: string;
};
export declare type ParamsOfHDKeyDeriveFromXPrvPath = {
    xprv: string;
    path: string;
};
export declare type ResultOfHDKeyDeriveFromXPrvPath = {
    xprv: string;
};
export declare type ParamsOfHDKeySecretFromXPrv = {
    xprv: string;
};
export declare type ResultOfHDKeySecretFromXPrv = {
    secret: string;
};
export declare type ParamsOfHDKeyPublicFromXPrv = {
    xprv: string;
};
export declare type ResultOfHDKeyPublicFromXPrv = {
    public: string;
};
export declare type ParamsOfChaCha20 = {
    data: string;
    key: string;
    nonce: string;
};
export declare type ResultOfChaCha20 = {
    data: string;
};
export declare type Abi = {
    type: "Contract";
    value: AbiContract;
} | {
    type: "Handle";
    value: AbiHandle;
};
export declare type AbiHandle = number;
export declare type FunctionHeader = {
    expire?: number;
    time?: bigint;
    pubkey?: string;
};
export declare type CallSet = {
    function_name: string;
    header?: FunctionHeader;
    input?: any;
};
export declare type DeploySet = {
    tvc: string;
    workchain_id?: number;
    initial_data?: any;
};
export declare type Signer = {
    type: "None";
} | {
    type: "External";
    public_key: string;
} | {
    type: "Keys";
    keys: KeyPair;
} | {
    type: "SigningBox";
    handle: SigningBoxHandle;
};
export declare type MessageBodyType = "Input" | "Output" | "InternalOutput" | "Event";
export declare type StateInitSource = {
    type: "Message";
    source: MessageSource;
} | {
    type: "StateInit";
    code: string;
    data: string;
    library?: string;
} | {
    type: "Tvc";
    tvc: string;
    public_key?: string;
    init_params?: StateInitParams;
};
export declare type StateInitParams = {
    abi: Abi;
    value: any;
};
export declare type MessageSource = {
    type: "Encoded";
    message: string;
    abi?: Abi;
} | {
    type: "EncodingParams";
    value: ParamsOfEncodeMessage;
};
export declare type AbiParam = {
    name: string;
    type: string;
    components?: AbiParam[];
};
export declare type AbiEvent = {
    name: string;
    inputs: AbiParam[];
    id?: number;
};
export declare type AbiData = {
    key: bigint;
    name: string;
    type: string;
    components?: AbiParam[];
};
export declare type AbiFunction = {
    name: string;
    inputs: AbiParam[];
    outputs: AbiParam[];
    id?: number;
};
export declare type AbiContract = {
    "ABI version": number;
    header?: string[];
    functions?: AbiFunction[];
    events?: AbiEvent[];
    data?: AbiData[];
};
export declare type ParamsOfEncodeMessageBody = {
    abi: Abi;
    call_set: CallSet;
    is_internal: boolean;
    signer: Signer;
    processing_try_index?: number;
};
export declare type ResultOfEncodeMessageBody = {
    body: string;
    data_to_sign?: string;
};
export declare type ParamsOfAttachSignatureToMessageBody = {
    abi: Abi;
    public_key: string;
    message: string;
    signature: string;
};
export declare type ResultOfAttachSignatureToMessageBody = {
    body: string;
};
export declare type ParamsOfEncodeMessage = {
    abi: Abi;
    address?: string;
    deploy_set?: DeploySet;
    call_set?: CallSet;
    signer: Signer;
    processing_try_index?: number;
};
export declare type ResultOfEncodeMessage = {
    message: string;
    data_to_sign?: string;
    address: string;
    message_id: string;
};
export declare type ParamsOfAttachSignature = {
    abi: Abi;
    public_key: string;
    message: string;
    signature: string;
};
export declare type ResultOfAttachSignature = {
    message: string;
    message_id: string;
};
export declare type ParamsOfDecodeMessage = {
    abi: Abi;
    message: string;
};
export declare type DecodedMessageBody = {
    body_type: MessageBodyType;
    name: string;
    value?: any;
    header?: FunctionHeader;
};
export declare type ParamsOfDecodeMessageBody = {
    abi: Abi;
    body: string;
    is_internal: boolean;
};
export declare type ParamsOfEncodeAccount = {
    state_init: StateInitSource;
    balance?: bigint;
    last_trans_lt?: bigint;
    last_paid?: number;
};
export declare type ResultOfEncodeAccount = {
    account: string;
    id: string;
};
export declare type ParamsOfParse = {
    boc: string;
};
export declare type ResultOfParse = {
    parsed: any;
};
export declare type ParamsOfParseShardstate = {
    boc: string;
    id: string;
    workchain_id: number;
};
export declare type ParamsOfGetBlockchainConfig = {
    block_boc: string;
};
export declare type ResultOfGetBlockchainConfig = {
    config_boc: string;
};
export declare type ProcessingEvent = {
    type: "WillFetchFirstBlock";
} | {
    type: "FetchFirstBlockFailed";
    error: ClientError;
} | {
    type: "WillSend";
    shard_block_id: string;
    message_id: string;
    message: string;
} | {
    type: "DidSend";
    shard_block_id: string;
    message_id: string;
    message: string;
} | {
    type: "SendFailed";
    shard_block_id: string;
    message_id: string;
    message: string;
    error: ClientError;
} | {
    type: "WillFetchNextBlock";
    shard_block_id: string;
    message_id: string;
    message: string;
} | {
    type: "FetchNextBlockFailed";
    shard_block_id: string;
    message_id: string;
    message: string;
    error: ClientError;
} | {
    type: "MessageExpired";
    message_id: string;
    message: string;
    error: ClientError;
};
export declare type ResultOfProcessMessage = {
    transaction: any;
    out_messages: string[];
    decoded?: DecodedOutput;
    fees: TransactionFees;
};
export declare type DecodedOutput = {
    out_messages: DecodedMessageBody[];
    output?: any;
};
export declare type ParamsOfSendMessage = {
    message: string;
    abi?: Abi;
    send_events: boolean;
};
export declare type ResultOfSendMessage = {
    shard_block_id: string;
};
export declare type ParamsOfWaitForTransaction = {
    abi?: Abi;
    message: string;
    shard_block_id: string;
    send_events: boolean;
};
export declare type ParamsOfProcessMessage = {
    message_encode_params: ParamsOfEncodeMessage;
    send_events: boolean;
};
export declare type AddressStringFormat = {
    type: "AccountId";
} | {
    type: "Hex";
} | {
    type: "Base64";
    url: boolean;
    test: boolean;
    bounce: boolean;
};
export declare type ParamsOfConvertAddress = {
    address: string;
    output_format: AddressStringFormat;
};
export declare type ResultOfConvertAddress = {
    address: string;
};
export declare type ExecutionOptions = {
    blockchain_config?: string;
    block_time?: number;
    block_lt?: bigint;
    transaction_lt?: bigint;
};
export declare type AccountForExecutor = {
    type: "None";
} | {
    type: "Uninit";
} | {
    type: "Account";
    boc: string;
    unlimited_balance?: boolean;
};
export declare type TransactionFees = {
    in_msg_fwd_fee: bigint;
    storage_fee: bigint;
    gas_fee: bigint;
    out_msgs_fwd_fee: bigint;
    total_account_fees: bigint;
    total_output: bigint;
};
export declare type ParamsOfRunExecutor = {
    message: string;
    account: AccountForExecutor;
    execution_options?: ExecutionOptions;
    abi?: Abi;
    skip_transaction_check?: boolean;
};
export declare type ResultOfRunExecutor = {
    transaction: any;
    out_messages: string[];
    decoded?: DecodedOutput;
    account: string;
    fees: TransactionFees;
};
export declare type ParamsOfRunTvm = {
    message: string;
    account: string;
    execution_options?: ExecutionOptions;
    abi?: Abi;
};
export declare type ResultOfRunTvm = {
    out_messages: string[];
    decoded?: DecodedOutput;
    account: string;
};
export declare type ParamsOfRunGet = {
    account: string;
    function_name: string;
    input?: any;
    execution_options?: ExecutionOptions;
};
export declare type ResultOfRunGet = {
    output: any;
};
export declare type OrderBy = {
    path: string;
    direction: SortDirection;
};
export declare type SortDirection = "ASC" | "DESC";
export declare type ParamsOfQueryCollection = {
    collection: string;
    filter?: any;
    result: string;
    order?: OrderBy[];
    limit?: number;
};
export declare type ResultOfQueryCollection = {
    result: any[];
};
export declare type ParamsOfWaitForCollection = {
    collection: string;
    filter?: any;
    result: string;
    timeout?: number;
};
export declare type ResultOfWaitForCollection = {
    result: any;
};
export declare type ResultOfSubscribeCollection = {
    handle: number;
};
export declare type unit = void;
export declare type ParamsOfSubscribeCollection = {
    collection: string;
    filter?: any;
    result: string;
};
export declare class ClientModule {
    tonClient: TonClient;
    constructor(tonClient: TonClient);
    get_api_reference(): Promise<ResultOfGetApiReference>;
    version(): Promise<ResultOfVersion>;
    build_info(): Promise<ResultOfBuildInfo>;
}
export declare class CryptoModule {
    tonClient: TonClient;
    constructor(tonClient: TonClient);
    factorize(params: ParamsOfFactorize): Promise<ResultOfFactorize>;
    modular_power(params: ParamsOfModularPower): Promise<ResultOfModularPower>;
    ton_crc16(params: ParamsOfTonCrc16): Promise<ResultOfTonCrc16>;
    generate_random_bytes(params: ParamsOfGenerateRandomBytes): Promise<ResultOfGenerateRandomBytes>;
    convert_public_key_to_ton_safe_format(params: ParamsOfConvertPublicKeyToTonSafeFormat): Promise<ResultOfConvertPublicKeyToTonSafeFormat>;
    generate_random_sign_keys(): Promise<KeyPair>;
    sign(params: ParamsOfSign): Promise<ResultOfSign>;
    verify_signature(params: ParamsOfVerifySignature): Promise<ResultOfVerifySignature>;
    sha256(params: ParamsOfHash): Promise<ResultOfHash>;
    sha512(params: ParamsOfHash): Promise<ResultOfHash>;
    scrypt(params: ParamsOfScrypt): Promise<ResultOfScrypt>;
    nacl_sign_keypair_from_secret_key(params: ParamsOfNaclSignKeyPairFromSecret): Promise<KeyPair>;
    nacl_sign(params: ParamsOfNaclSign): Promise<ResultOfNaclSign>;
    nacl_sign_open(params: ParamsOfNaclSignOpen): Promise<ResultOfNaclSignOpen>;
    nacl_sign_detached(params: ParamsOfNaclSign): Promise<ResultOfNaclSignDetached>;
    nacl_box_keypair(): Promise<KeyPair>;
    nacl_box_keypair_from_secret_key(params: ParamsOfNaclBoxKeyPairFromSecret): Promise<KeyPair>;
    nacl_box(params: ParamsOfNaclBox): Promise<ResultOfNaclBox>;
    nacl_box_open(params: ParamsOfNaclBoxOpen): Promise<ResultOfNaclBoxOpen>;
    nacl_secret_box(params: ParamsOfNaclSecretBox): Promise<ResultOfNaclBox>;
    nacl_secret_box_open(params: ParamsOfNaclSecretBoxOpen): Promise<ResultOfNaclBoxOpen>;
    mnemonic_words(params: ParamsOfMnemonicWords): Promise<ResultOfMnemonicWords>;
    mnemonic_from_random(params: ParamsOfMnemonicFromRandom): Promise<ResultOfMnemonicFromRandom>;
    mnemonic_from_entropy(params: ParamsOfMnemonicFromEntropy): Promise<ResultOfMnemonicFromEntropy>;
    mnemonic_verify(params: ParamsOfMnemonicVerify): Promise<ResultOfMnemonicVerify>;
    mnemonic_derive_sign_keys(params: ParamsOfMnemonicDeriveSignKeys): Promise<KeyPair>;
    hdkey_xprv_from_mnemonic(params: ParamsOfHDKeyXPrvFromMnemonic): Promise<ResultOfHDKeyXPrvFromMnemonic>;
    hdkey_derive_from_xprv(params: ParamsOfHDKeyDeriveFromXPrv): Promise<ResultOfHDKeyDeriveFromXPrv>;
    hdkey_derive_from_xprv_path(params: ParamsOfHDKeyDeriveFromXPrvPath): Promise<ResultOfHDKeyDeriveFromXPrvPath>;
    hdkey_secret_from_xprv(params: ParamsOfHDKeySecretFromXPrv): Promise<ResultOfHDKeySecretFromXPrv>;
    hdkey_public_from_xprv(params: ParamsOfHDKeyPublicFromXPrv): Promise<ResultOfHDKeyPublicFromXPrv>;
    chacha20(params: ParamsOfChaCha20): Promise<ResultOfChaCha20>;
}
export declare class AbiModule {
    tonClient: TonClient;
    constructor(tonClient: TonClient);
    encode_message_body(params: ParamsOfEncodeMessageBody): Promise<ResultOfEncodeMessageBody>;
    attach_signature_to_message_body(params: ParamsOfAttachSignatureToMessageBody): Promise<ResultOfAttachSignatureToMessageBody>;
    encode_message(params: ParamsOfEncodeMessage): Promise<ResultOfEncodeMessage>;
    attach_signature(params: ParamsOfAttachSignature): Promise<ResultOfAttachSignature>;
    decode_message(params: ParamsOfDecodeMessage): Promise<DecodedMessageBody>;
    decode_message_body(params: ParamsOfDecodeMessageBody): Promise<DecodedMessageBody>;
    encode_account(params: ParamsOfEncodeAccount): Promise<ResultOfEncodeAccount>;
}
export declare class BocModule {
    tonClient: TonClient;
    constructor(tonClient: TonClient);
    parse_message(params: ParamsOfParse): Promise<ResultOfParse>;
    parse_transaction(params: ParamsOfParse): Promise<ResultOfParse>;
    parse_account(params: ParamsOfParse): Promise<ResultOfParse>;
    parse_block(params: ParamsOfParse): Promise<ResultOfParse>;
    parse_shardstate(params: ParamsOfParseShardstate): Promise<ResultOfParse>;
    get_blockchain_config(params: ParamsOfGetBlockchainConfig): Promise<ResultOfGetBlockchainConfig>;
}
export declare class ProcessingModule {
    tonClient: TonClient;
    constructor(tonClient: TonClient);
    send_message(params: ParamsOfSendMessage, cb?: ResponseHandler): Promise<ResultOfSendMessage>;
    wait_for_transaction(params: ParamsOfWaitForTransaction, cb?: ResponseHandler): Promise<ResultOfProcessMessage>;
    process_message(params: ParamsOfProcessMessage, cb?: ResponseHandler): Promise<ResultOfProcessMessage>;
}
export declare class UtilsModule {
    tonClient: TonClient;
    constructor(tonClient: TonClient);
    convert_address(params: ParamsOfConvertAddress): Promise<ResultOfConvertAddress>;
}
export declare class TvmModule {
    tonClient: TonClient;
    constructor(tonClient: TonClient);
    run_executor(params: ParamsOfRunExecutor): Promise<ResultOfRunExecutor>;
    run_tvm(params: ParamsOfRunTvm): Promise<ResultOfRunTvm>;
    run_get(params: ParamsOfRunGet): Promise<ResultOfRunGet>;
}
export declare class NetModule {
    tonClient: TonClient;
    constructor(tonClient: TonClient);
    query_collection(params: ParamsOfQueryCollection): Promise<ResultOfQueryCollection>;
    wait_for_collection(params: ParamsOfWaitForCollection): Promise<ResultOfWaitForCollection>;
    unsubscribe(params: ResultOfSubscribeCollection): Promise<undefined>;
    subscribe_collection(params: ParamsOfSubscribeCollection, cb?: ResponseHandler): Promise<ResultOfSubscribeCollection>;
}
