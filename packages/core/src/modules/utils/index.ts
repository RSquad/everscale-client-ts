import { TonClient } from "../..";
import {
  ParamsOfConvertAddress,
  ResultOfConvertAddress,
  ParamsOfGetAddressType,
  ResultOfGetAddressType,
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
   * Validates and returns the type of any TON address.
   *
   * @remarks
   * Address types are the following
   *
   * `0:919db8e740d50bf349df2eea03fa30c385d846b991ff5542e67098ee833fc7f7` - standard TON address most
   * commonly used in all cases. Also called as hex address
   * `919db8e740d50bf349df2eea03fa30c385d846b991ff5542e67098ee833fc7f7` - account ID. A part of full
   * address. Identifies account inside particular workchain
   * `EQCRnbjnQNUL80nfLuoD+jDDhdhGuZH/VULmcJjugz/H9wam` - base64 address. Also called "user-friendly".
   * Was used at the beginning of TON. Now it is supported for compatibility
   *
   * @param {ParamsOfGetAddressType} param - parameters
   * @returns ResultOfGetAddressType
   */
  get_address_type(
    params: ParamsOfGetAddressType
  ): Promise<ResultOfGetAddressType> {
    return this.tonClient.request("utils.get_address_type", params);
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
