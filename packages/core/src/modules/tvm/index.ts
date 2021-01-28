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

  /**
   * Emulates all the phases of contract execution locally
   *
   * @remarks
   * Performs all the phases of contract execution on Transaction Executor -
   * the same component that is used on Validator Nodes.
   *
   * Can be used for contract debug, to find out the reason of message unsuccessful
   * delivery - as Validators just throw away failed transactions, here you can catch it.
   *
   * Another use case is to estimate fees for message execution. Set  `AccountForExecutor::Account.unlimited_balance`
   * to `true` so that emulation will not depend on the actual balance.
   *
   * One more use case - you can procude the sequence of operations,
   * thus emulating the multiple contract calls locally.
   * And so on.
   *
   * To get the account boc (bag of cells) - use `net.query` method to download it from graphql api
   * (field `boc` of `account`) or generate it with `abi.encode_account method`.
   * To get the message boc - use `abi.encode_message` or prepare it any other way, for instance, with Fift script.
   *
   * If you need this emulation to be as precise as possible then specify `ParamsOfRunExecutor` parameter.
   * If you need to see the aborted transaction as a result, not as an error, set `skip_transaction_check` to `true`.
   *
   * @param {ParamsOfRunExecutor} param - parameters
   * @returns ResultOfRunExecutor
   */
  run_executor(params: ParamsOfRunExecutor): Promise<ResultOfRunExecutor> {
    return this.tonClient.request("tvm.run_executor", params);
  }

  /**
   * Executes get methods of ABI-compatible contracts
   *
   * @remarks
   * Performs only a part of compute phase of transaction execution
   * that is used to run get-methods of ABI-compatible contracts.
   *
   * If you try to run get methods with `run_executor` you will get an error, because it checks ACCEPT and exits
   * if there is none, which is actually true for get methods.
   *
   * To get the account boc (bag of cells) - use `net.query` method to download it from graphql api
   * (field `boc` of `account`) or generate it with `abi.encode_account method`.
   * To get the message boc - use `abi.encode_message` or prepare it any other way, for instance, with Fift script.
   *
   * Attention! Updated account state is produces as well, but only
   * `account_state.storage.state.data`  part of the boc is updated.
   *
   * @param {ParamsOfRunTvm} param - parameters
   * @returns ResultOfRunTvm
   */
  run_tvm(params: ParamsOfRunTvm): Promise<ResultOfRunTvm> {
    return this.tonClient.request("tvm.run_tvm", params);
  }

  /**
   * Executes a getmethod of FIFT contract
   *
   * @remarks
   * Executes a getmethod of FIFT contract that fulfills the smc-guidelines https://test.ton.org/smc-guidelines.txt
   * and returns the result data from TVM's stack
   *
   * @param {ParamsOfRunGet} param - parameters
   * @returns ResultOfRunGet
   */
  run_get(params: ParamsOfRunGet): Promise<ResultOfRunGet> {
    return this.tonClient.request("tvm.run_get", params);
  }
}
