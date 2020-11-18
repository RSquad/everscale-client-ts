import { TonClient } from "../..";
import { ParamsOfRunExecutor, ResultOfRunExecutor, ParamsOfRunTvm, ResultOfRunTvm, ParamsOfRunGet, ResultOfRunGet } from "./types";
export declare class TvmModule {
    tonClient: TonClient;
    constructor(tonClient: TonClient);
    run_executor(params: ParamsOfRunExecutor): Promise<ResultOfRunExecutor>;
    run_tvm(params: ParamsOfRunTvm): Promise<ResultOfRunTvm>;
    /**
     * Executes getmethod and returns data from TVM stack
     *
     * @remarks
     * Executes getmethod and returns data from TVM stack
     *
     * @param {ParamsOfRunGet} param - parameters
     * @returns ResultOfRunGet
     */
    run_get(params: ParamsOfRunGet): Promise<ResultOfRunGet>;
}
