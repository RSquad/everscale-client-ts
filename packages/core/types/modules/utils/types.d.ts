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
    /**
     * address - Account address in any TON format.
     */
    address: string;
    output_format: AddressStringFormat;
};
export declare type ResultOfConvertAddress = {
    /**
     * address - Address in the specified format
     */
    address: string;
};
