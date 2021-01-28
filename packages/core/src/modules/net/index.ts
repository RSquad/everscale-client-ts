import { TonClient, ResponseHandler } from "../..";
import {
  ParamsOfQuery,
  ResultOfQuery,
  ParamsOfQueryCollection,
  ResultOfQueryCollection,
  ParamsOfWaitForCollection,
  ResultOfWaitForCollection,
  ResultOfSubscribeCollection,
  ParamsOfSubscribeCollection,
  ParamsOfFindLastShardBlock,
  ResultOfFindLastShardBlock,
  EndpointsSet,
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
   * Triggers for each insert/update of data
   * that satisfies the `filter` conditions.
   * The projection fields are limited to `result` fields.
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
}
