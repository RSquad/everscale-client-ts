import { TonClient } from "../..";
import {
  ParamsOfInit,
  ParamsOfAppDebotBrowser,
  ResultOfAppDebotBrowser,
  RegisteredDebot,
  ParamsOfStart,
  ParamsOfFetch,
  ResultOfFetch,
  ParamsOfExecute,
  ParamsOfSend,
  ParamsOfRemove,
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
   * [UNSTABLE](UNSTABLE.md) Creates and instance of DeBot.
   *
   * @remarks
   * Downloads debot smart contract (code and data) from blockchain and creates
   * an instance of Debot Engine for it.
   *
   * # Remarks
   * It does not switch debot to context 0. Browser Callbacks are not called.
   *
   * @param {ParamsOfInit} param - [UNSTABLE](UNSTABLE.md) Parameters to init DeBot.
   * @returns [UNSTABLE](UNSTABLE.md) Structure for storing debot handle returned from `init` function.
   */
  init(params: ParamsOfInit): Promise<RegisteredDebot> {
    return this.tonClient.request("debot.init", params);
  }

  /**
   * [UNSTABLE](UNSTABLE.md) Starts the DeBot.
   *
   * @remarks
   * Downloads debot smart contract from blockchain and switches it to
   * context zero.
   *
   * This function must be used by Debot Browser to start a dialog with debot.
   * While the function is executing, several Browser Callbacks can be called,
   * since the debot tries to display all actions from the context 0 to the user.
   *
   * When the debot starts SDK registers `BrowserCallbacks` AppObject.
   * Therefore when `debote.remove` is called the debot is being deleted and the callback is called
   * with `finish`=`true` which indicates that it will never be used again.
   *
   * @param {ParamsOfStart} param - [UNSTABLE](UNSTABLE.md) Parameters to start DeBot. DeBot must be already initialized with init() function.
   */
  start(params: ParamsOfStart): Promise<undefined> {
    return this.tonClient.request("debot.start", params);
  }

  /**
   * [UNSTABLE](UNSTABLE.md) Fetches DeBot metadata from blockchain.
   *
   * @remarks
   * Downloads DeBot from blockchain and creates and fetches its metadata.
   *
   * @param {ParamsOfFetch} param - [UNSTABLE](UNSTABLE.md) Parameters to fetch DeBot metadata.
   * @returns [UNSTABLE](UNSTABLE.md)
   */
  fetch(params: ParamsOfFetch): Promise<ResultOfFetch> {
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
   * [UNSTABLE](UNSTABLE.md) Sends message to Debot.
   *
   * @remarks
   * Used by Debot Browser to send response on Dinterface call or from other Debots.
   *
   * @param {ParamsOfSend} param - [UNSTABLE](UNSTABLE.md) Parameters of `send` function.
   */
  send(params: ParamsOfSend): Promise<undefined> {
    return this.tonClient.request("debot.send", params);
  }

  /**
   * [UNSTABLE](UNSTABLE.md) Destroys debot handle.
   *
   * @remarks
   * Removes handle from Client Context and drops debot engine referenced by that handle.
   *
   * @param {ParamsOfRemove} param - [UNSTABLE](UNSTABLE.md)
   */
  remove(params: ParamsOfRemove): Promise<undefined> {
    return this.tonClient.request("debot.remove", params);
  }
}
