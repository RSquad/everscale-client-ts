export type AddressStringFormat =
  | {
      type: "AccountId";
    }
  | {
      type: "Hex";
    }
  | {
      type: "Base64";
      url: boolean;
      test: boolean;
      bounce: boolean;
    };

export type AccountAddressType = "AccountId" | "Hex" | "Base64";

export type ParamsOfConvertAddress = {
  /**
   * address - Account address in any TON format.
   */
  address: string;
  output_format: AddressStringFormat;
};

export type ResultOfConvertAddress = {
  /**
   * address - Address in the specified format
   */
  address: string;
};

export type ParamsOfGetAddressType = {
  /**
   * address - Account address in any TON format.
   */
  address: string;
};

export type ResultOfGetAddressType = {
  address_type: AccountAddressType;
};

export type ParamsOfCalcStorageFee = {
  account: string;
  period: number;
};

export type ResultOfCalcStorageFee = {
  fee: string;
};

export type ParamsOfCompressZstd = {
  /**
   * uncompressed - Uncompressed data.
   */
  uncompressed: string;
  /**
   * level - Compression level, from 1 to 21. Where: 1 - lowest compression level (fastest compression); 21 - highest compression level (slowest compression). If level is omitted, the default compression level is used (currently `3`).
   */
  level?: number;
};

export type ResultOfCompressZstd = {
  /**
   * compressed - Compressed data.
   */
  compressed: string;
};

export type ParamsOfDecompressZstd = {
  /**
   * compressed - Compressed data.
   */
  compressed: string;
};

export type ResultOfDecompressZstd = {
  /**
   * decompressed - Decompressed data.
   */
  decompressed: string;
};
