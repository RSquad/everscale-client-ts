import { TonClient, ResponseHandler } from "../..";
import {
  ParamsOfQuery,
  ResultOfQuery,
  ParamsOfBatchQuery,
  ResultOfBatchQuery,
  ParamsOfQueryCollection,
  ResultOfQueryCollection,
  ParamsOfAggregateCollection,
  ResultOfAggregateCollection,
  ParamsOfWaitForCollection,
  ResultOfWaitForCollection,
  ResultOfSubscribeCollection,
  ParamsOfSubscribeCollection,
  ParamsOfFindLastShardBlock,
  ResultOfFindLastShardBlock,
  EndpointsSet,
  ParamsOfQueryCounterparties,
} from "./types";

/**
 * Network access.
 */
export class NetModule {
  tonClient: TonClient;
  constructor(tonClient: TonClient) {
    this.tonClient = tonClient;
  }

  /**
   * Performs DAppServer GraphQL query.
   *
   * @param {ParamsOfQuery} param - parameters
   * @returns ResultOfQuery
   */
  query(params: ParamsOfQuery): Promise<ResultOfQuery> {
    return this.tonClient.request("net.query", params);
  }

  /**
   * Performs multiple queries per single fetch.
   *
   * @param {ParamsOfBatchQuery} param - parameters
   * @returns ResultOfBatchQuery
   */
  batch_query(params: ParamsOfBatchQuery): Promise<ResultOfBatchQuery> {
    return this.tonClient.request("net.batch_query", params);
  }

  /**
   * Queries collection data
   *
   * @remarks
   * Queries data that satisfies the `filter` conditions,
   * limits the number of returned records and orders them.
   * The projection fields are limited to `result` fields
   *
   * @param {ParamsOfQueryCollection} param - parameters
   * @returns ResultOfQueryCollection
   */
  query_collection(
    params: ParamsOfQueryCollection
  ): Promise<ResultOfQueryCollection> {
    return this.tonClient.request("net.query_collection", params);
  }

  /**
   * Aggregates collection data.
   *
   * @remarks
   * Aggregates values from the specified `fields` for records
   * that satisfies the `filter` conditions,
   *
   * @param {ParamsOfAggregateCollection} param - parameters
   * @returns ResultOfAggregateCollection
   */
  aggregate_collection(
    params: ParamsOfAggregateCollection
  ): Promise<ResultOfAggregateCollection> {
    return this.tonClient.request("net.aggregate_collection", params);
  }

  /**
   * Returns an object that fulfills the conditions or waits for its appearance
   *
   * @remarks
   * Triggers only once.
   * If object that satisfies the `filter` conditions
   * already exists - returns it immediately.
   * If not - waits for insert/update of data within the specified `timeout`,
   * and returns it.
   * The projection fields are limited to `result` fields
   *
   * @param {ParamsOfWaitForCollection} param - parameters
   * @returns ResultOfWaitForCollection
   */
  wait_for_collection(
    params: ParamsOfWaitForCollection
  ): Promise<ResultOfWaitForCollection> {
    return this.tonClient.request("net.wait_for_collection", params);
  }

  /**
   * Cancels a subscription
   *
   * @remarks
   * Cancels a subscription specified by its handle.
   *
   * @param {ResultOfSubscribeCollection} param - parameters
   */
  unsubscribe(params: ResultOfSubscribeCollection): Promise<undefined> {
    return this.tonClient.request("net.unsubscribe", params);
  }

  /**
   * Creates a subscription
   *
   * @remarks
   * Triggers for each insert/update of data that satisfies
   * the `filter` conditions.
   * The projection fields are limited to `result` fields.
   *
   * The subscription is a persistent communication channel between
   * client and Free TON Network.
   * All changes in the blockchain will be reflected in realtime.
   * Changes means inserts and updates of the blockchain entities.
   *
   * ### Important Notes on Subscriptions
   *
   * Unfortunately sometimes the connection with the network brakes down.
   * In this situation the library attempts to reconnect to the network.
   * This reconnection sequence can take significant time.
   * All of this time the client is disconnected from the network.
   *
   * Bad news is that all blockchain changes that happened while
   * the client was disconnected are lost.
   *
   * Good news is that the client report errors to the callback when
   * it loses and resumes connection.
   *
   * So, if the lost changes are important to the application then
   * the application must handle these error reports.
   *
   * Library reports errors with `responseType` == 101
   * and the error object passed via `params`.
   *
   * When the library has successfully reconnected
   * the application receives callback with
   * `responseType` == 101 and `params.code` == 614 (NetworkModuleResumed).
   *
   * Application can use several ways to handle this situation:
   * - If application monitors changes for the single blockchain
   * object (for example specific account):  application
   * can perform a query for this object and handle actual data as a
   * regular data from the subscription.
   * - If application monitors sequence of some blockchain objects
   * (for example transactions of the specific account): application must
   * refresh all cached (or visible to user) lists where this sequences presents.
   *
   * @param {ParamsOfSubscribeCollection} param - parameters
   * @param {Request} responseHandler - Request callback
   * @returns ResultOfSubscribeCollection
   */
  subscribe_collection(
    params: ParamsOfSubscribeCollection,
    responseHandler?: ResponseHandler
  ): Promise<ResultOfSubscribeCollection> {
    return this.tonClient.request(
      "net.subscribe_collection",
      params,
      responseHandler
    );
  }

  /**
   * Suspends network module to stop any network activity
   */
  suspend(): Promise<undefined> {
    return this.tonClient.request("net.suspend");
  }

  /**
   * Resumes network module to enable network activity
   */
  resume(): Promise<undefined> {
    return this.tonClient.request("net.resume");
  }

  /**
   * Returns ID of the last block in a specified account shard
   *
   * @param {ParamsOfFindLastShardBlock} param - parameters
   * @returns ResultOfFindLastShardBlock
   */
  find_last_shard_block(
    params: ParamsOfFindLastShardBlock
  ): Promise<ResultOfFindLastShardBlock> {
    return this.tonClient.request("net.find_last_shard_block", params);
  }

  /**
   * Requests the list of alternative endpoints from server
   */
  fetch_endpoints(): Promise<EndpointsSet> {
    return this.tonClient.request("net.fetch_endpoints");
  }

  /**
   * Sets the list of endpoints to use on reinit
   *
   * @param {EndpointsSet} param - parameters
   */
  set_endpoints(params: EndpointsSet): Promise<undefined> {
    return this.tonClient.request("net.set_endpoints", params);
  }

  /**
   * Allows to query and paginate through the list of accounts that the specified account has interacted with, sorted by the time of the last internal message between accounts
   *
   * @remarks
   * *Attention* this query retrieves data from 'Counterparties' service which is not supported in
   * the opensource version of DApp Server (and will not be supported) as well as in TON OS SE (will be supported in SE in future),
   * but is always accessible via [TON OS Devnet/Mainnet Clouds](https://docs.ton.dev/86757ecb2/p/85c869-networks)
   *
   * @param {ParamsOfQueryCounterparties} param - parameters
   * @returns ResultOfQueryCollection
   */
  query_counterparties(
    params: ParamsOfQueryCounterparties
  ): Promise<ResultOfQueryCollection> {
    return this.tonClient.request("net.query_counterparties", params);
  }
}
