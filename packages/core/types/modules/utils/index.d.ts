import { TonClient } from "../..";
import { ParamsOfConvertAddress, ResultOfConvertAddress } from "./types";
/**
 * Misc utility Functions.
 *
 * @remarks
 * Misc utility Functions.
 */
export declare class UtilsModule {
    tonClient: TonClient;
    constructor(tonClient: TonClient);
    /**
     * Converts address from any TON format to any TON format
     *
     * @remarks
     * Converts address from any TON format to any TON format
     *
     * @param {ParamsOfConvertAddress} param - parameters
     * @returns ResultOfConvertAddress
     */
    convert_address(params: ParamsOfConvertAddress): Promise<ResultOfConvertAddress>;
}
