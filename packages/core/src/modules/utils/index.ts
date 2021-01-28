import { TonClient } from "../..";
import { ParamsOfConvertAddress, ResultOfConvertAddress } from "./types";

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
}
