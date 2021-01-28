import { TonClient, ResponseHandler } from "../..";
import {
  ParamsOfSendMessage,
  ResultOfSendMessage,
  ParamsOfWaitForTransaction,
  ResultOfProcessMessage,
  ParamsOfProcessMessage,
} from "./types";

/**
 * Message processing module.
 *
 * @remarks
 * This module incorporates functions related to complex message
 * processing scenarios.
 */
export class ProcessingModule {
  tonClient: TonClient;
  constructor(tonClient: TonClient) {
    this.tonClient = tonClient;
  }

  /**
   * Sends message to the network
   *
   * @remarks
   * Sends message to the network and returns the last generated shard block of the destination account
   * before the message was sent. It will be required later for message processing.
   *
   * @param {ParamsOfSendMessage} param - parameters
   * @param {Request} responseHandler - Request callback
   * @returns ResultOfSendMessage
   */
  send_message(
    params: ParamsOfSendMessage,
    responseHandler?: ResponseHandler
  ): Promise<ResultOfSendMessage> {
    return this.tonClient.request(
      "processing.send_message",
      params,
      responseHandler
    );
  }

  /**
   * Performs monitoring of the network for the result transaction of the external inbound message processing.
   *
   * @remarks
   * `send_events` enables intermediate events, such as `WillFetchNextBlock`,
   * `FetchNextBlockFailed` that may be useful for logging of new shard blocks creation
   * during message processing.
   *
   * Note, that presence of the `abi` parameter is critical for ABI
   * compliant contracts. Message processing uses drastically
   * different strategy for processing message for contracts which
   * ABI includes "expire" header.
   *
   * When the ABI header `expire` is present, the processing uses
   * `message expiration` strategy:
   * - The maximum block gen time is set to
   * `message_expiration_timeout + transaction_wait_timeout`.
   * - When maximum block gen time is reached, the processing will
   * be finished with `MessageExpired` error.
   *
   * When the ABI header `expire` isn't present or `abi` parameter
   * isn't specified, the processing uses `transaction waiting`
   * strategy:
   * - The maximum block gen time is set to
   * `now() + transaction_wait_timeout`.
   *
   * - If maximum block gen time is reached and no result transaction is found,
   * the processing will exit with an error.
   *
   * @param {ParamsOfWaitForTransaction} param - parameters
   * @param {Request} responseHandler - Request callback
   * @returns ResultOfProcessMessage
   */
  wait_for_transaction(
    params: ParamsOfWaitForTransaction,
    responseHandler?: ResponseHandler
  ): Promise<ResultOfProcessMessage> {
    return this.tonClient.request(
      "processing.wait_for_transaction",
      params,
      responseHandler
    );
  }

  /**
   * Creates message, sends it to the network and monitors its processing.
   *
   * @remarks
   * Creates ABI-compatible message,
   * sends it to the network and monitors for the result transaction.
   * Decodes the output messages' bodies.
   *
   * If contract's ABI includes "expire" header, then
   * SDK implements retries in case of unsuccessful message delivery within the expiration
   * timeout: SDK recreates the message, sends it and processes it again.
   *
   * The intermediate events, such as `WillFetchFirstBlock`, `WillSend`, `DidSend`,
   * `WillFetchNextBlock`, etc - are switched on/off by `send_events` flag
   * and logged into the supplied callback function.
   *
   * The retry configuration parameters are defined in the client's `NetworkConfig` and `AbiConfig`.
   *
   * If contract's ABI does not include "expire" header
   * then, if no transaction is found within the network timeout (see config parameter ), exits with error.
   *
   * @param {ParamsOfProcessMessage} param - parameters
   * @param {Request} responseHandler - Request callback
   * @returns ResultOfProcessMessage
   */
  process_message(
    params: ParamsOfProcessMessage,
    responseHandler?: ResponseHandler
  ): Promise<ResultOfProcessMessage> {
    return this.tonClient.request(
      "processing.process_message",
      params,
      responseHandler
    );
  }
}
