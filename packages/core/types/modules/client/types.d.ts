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
    out_of_sync_threshold?: number;
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
    /**
     * name - Dependency name. Usually it is a crate name.
     */
    name: string;
    /**
     * git_commit - Git commit hash of the related repository.
     */
    git_commit: string;
};
export declare type ResultOfGetApiReference = {
    api: any;
};
export declare type ResultOfVersion = {
    /**
     * version - Core Library version
     */
    version: string;
};
export declare type ResultOfBuildInfo = {
    /**
     * build_number - Build number assigned to this build by the CI.
     */
    build_number: number;
    /**
     * dependencies - Fingerprint of the most important dependencies.
     */
    dependencies: BuildInfoDependency[];
};
