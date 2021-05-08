import { TonClient } from "../..";
import {
  ParamsOfConvertAddress,
  ResultOfConvertAddress,
  ParamsOfCalcStorageFee,
  ResultOfCalcStorageFee,
  ParamsOfCompressZstd,
  ResultOfCompressZstd,
  ParamsOfDecompressZstd,
  ResultOfDecompressZstd,
} from "./types";

/**
 * Misc utility Functions.
 */
export class UtilsModule {
  tonClient: TonClient;
  constructor(tonClient: TonClient) {
    this.tonClient = tonClient;
  }

  /**
   * Converts address from any TON format to any TON format
   *
   * @param {ParamsOfConvertAddress} param - parameters
   * @returns ResultOfConvertAddress
   */
  convert_address(
    params: ParamsOfConvertAddress
  ): Promise<ResultOfConvertAddress> {
    return this.tonClient.request("utils.convert_address", params);
  }

  /**
   * Calculates storage fee for an account over a specified time period
   *
   * @param {ParamsOfCalcStorageFee} param - parameters
   * @returns ResultOfCalcStorageFee
   */
  calc_storage_fee(
    params: ParamsOfCalcStorageFee
  ): Promise<ResultOfCalcStorageFee> {
    return this.tonClient.request("utils.calc_storage_fee", params);
  }

  /**
   * Compresses data using Zstandard algorithm
   *
   * @param {ParamsOfCompressZstd} param - parameters
   * @returns ResultOfCompressZstd
   */
  compress_zstd(params: ParamsOfCompressZstd): Promise<ResultOfCompressZstd> {
    return this.tonClient.request("utils.compress_zstd", params);
  }

  /**
   * Decompresses data using Zstandard algorithm
   *
   * @param {ParamsOfDecompressZstd} param - parameters
   * @returns ResultOfDecompressZstd
   */
  decompress_zstd(
    params: ParamsOfDecompressZstd
  ): Promise<ResultOfDecompressZstd> {
    return this.tonClient.request("utils.decompress_zstd", params);
  }
}
