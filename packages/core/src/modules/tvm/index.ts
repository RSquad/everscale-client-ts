import { TonClient } from "../..";
import {
  ParamsOfRunExecutor,
  ResultOfRunExecutor,
  ParamsOfRunTvm,
  ResultOfRunTvm,
  ParamsOfRunGet,
  ResultOfRunGet,
} from "./types";

export class TvmModule {
  tonClient: TonClient;
  constructor(tonClient: TonClient) {
    this.tonClient = tonClient;
  }

  run_executor(params: ParamsOfRunExecutor): Promise<ResultOfRunExecutor> {
    return this.tonClient.request("tvm.run_executor", params);
  }

  run_tvm(params: ParamsOfRunTvm): Promise<ResultOfRunTvm> {
    return this.tonClient.request("tvm.run_tvm", params);
  }

  /**
   * Executes getmethod and returns data from TVM stack
   *
   * @remarks
   * Executes getmethod and returns data from TVM stack
   *
   * @param {ParamsOfRunGet} param - parameters
   * @returns ResultOfRunGet
   */
  run_get(params: ParamsOfRunGet): Promise<ResultOfRunGet> {
    return this.tonClient.request("tvm.run_get", params);
  }
}
