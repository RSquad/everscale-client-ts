import { TonClient } from "../..";
import {
  ParamsOfStart,
  ParamsOfAppDebotBrowser,
  ResultOfAppDebotBrowser,
  RegisteredDebot,
  ParamsOfFetch,
  ParamsOfExecute,
} from "./types";

/**
 * [UNSTABLE](UNSTABLE.md) Module for working with debot.
 */
export class DebotModule {
  tonClient: TonClient;
  constructor(tonClient: TonClient) {
    this.tonClient = tonClient;
  }

  /**
   * [UNSTABLE](UNSTABLE.md) Starts an instance of debot.
   *
   * @remarks
   * Downloads debot smart contract from blockchain and switches it to
   * context zero.
   * Returns a debot handle which can be used later in `execute` function.
   * This function must be used by Debot Browser to start a dialog with debot.
   * While the function is executing, several Browser Callbacks can be called,
   * since the debot tries to display all actions from the context 0 to the user.
   *
   * # Remarks
   * `start` is equivalent to `fetch` + switch to context 0.
   *
   * @param {ParamsOfStart} param - [UNSTABLE](UNSTABLE.md) Parameters to start debot.
   * @returns [UNSTABLE](UNSTABLE.md) Structure for storing debot handle returned from `start` and `fetch` functions.
   */
  start(params: ParamsOfStart): Promise<RegisteredDebot> {
    return this.tonClient.request("debot.start", params);
  }

  /**
   * [UNSTABLE](UNSTABLE.md) Fetches debot from blockchain.
   *
   * @remarks
   * Downloads debot smart contract (code and data) from blockchain and creates
   * an instance of Debot Engine for it.
   *
   * # Remarks
   * It does not switch debot to context 0. Browser Callbacks are not called.
   *
   * @param {ParamsOfFetch} param - [UNSTABLE](UNSTABLE.md) Parameters to fetch debot.
   * @returns [UNSTABLE](UNSTABLE.md) Structure for storing debot handle returned from `start` and `fetch` functions.
   */
  fetch(params: ParamsOfFetch): Promise<RegisteredDebot> {
    return this.tonClient.request("debot.fetch", params);
  }

  /**
   * [UNSTABLE](UNSTABLE.md) Executes debot action.
   *
   * @remarks
   * Calls debot engine referenced by debot handle to execute input action.
   * Calls Debot Browser Callbacks if needed.
   *
   * # Remarks
   * Chain of actions can be executed if input action generates a list of subactions.
   *
   * @param {ParamsOfExecute} param - [UNSTABLE](UNSTABLE.md) Parameters for executing debot action.
   */
  execute(params: ParamsOfExecute): Promise<undefined> {
    return this.tonClient.request("debot.execute", params);
  }

  /**
   * [UNSTABLE](UNSTABLE.md) Destroys debot handle.
   *
   * @remarks
   * Removes handle from Client Context and drops debot engine referenced by that handle.
   *
   * @param {RegisteredDebot} param - [UNSTABLE](UNSTABLE.md) Structure for storing debot handle returned from `start` and `fetch` functions.
   */
  remove(params: RegisteredDebot): Promise<undefined> {
    return this.tonClient.request("debot.remove", params);
  }
}
