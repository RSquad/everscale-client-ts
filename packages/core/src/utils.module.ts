import { UtilsModule as GeneratedUtilsModule } from "./modules/utils";
import TonClient from ".";

class UtilsModule extends GeneratedUtilsModule {
  async getBalance(
    address: string,
    outputFormat: "dec" | "hex" = "hex"
  ): Promise<string | typeof TonClient.TonClientError> {
    try {
      const { result } = await this.tonClient.net.query_collection({
        collection: "accounts",
        filter: { id: { eq: address } },
        result: "id balance",
      });
      if (!result[0]) {
        return "";
      }
      return outputFormat === "hex" ? result[0].balance : parseInt(result[0].balance, 16);
    } catch (err) {
      console.log(err);
      throw new TonClient.TonClientError(err.code, err.message, err.data);
    }
  }
}

export { UtilsModule };
