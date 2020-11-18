import { UtilsModule as GeneratedUtilsModule } from "./modules/utils";
import TonClient from ".";
declare class UtilsModule extends GeneratedUtilsModule {
    getBalance(address: string, outputFormat?: "dec" | "hex"): Promise<string | typeof TonClient.TonClientError>;
}
export { UtilsModule };
