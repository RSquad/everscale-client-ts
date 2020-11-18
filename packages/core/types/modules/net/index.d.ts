import { TonClient, ResponseHandler } from "../..";
import { ParamsOfQueryCollection, ResultOfQueryCollection, ParamsOfWaitForCollection, ResultOfWaitForCollection, ResultOfSubscribeCollection, ParamsOfSubscribeCollection } from "./types";
/**
 * Network access.
 *
 * @remarks
 * Network access.
 */
export declare class NetModule {
    tonClient: TonClient;
    constructor(tonClient: TonClient);
    /**
     * Queries collection data
     *
     * @remarks
     * Queries collection data
     *
     * Queries data that satisfies the `filter` conditions,
     * limits the number of returned records and orders them.
     * The projection fields are limited to  `result` fields
     *
     * @param {ParamsOfQueryCollection} param - parameters
     * @returns ResultOfQueryCollection
     */
    query_collection(params: ParamsOfQueryCollection): Promise<ResultOfQueryCollection>;
    /**
     * Returns an object that fulfills the conditions or waits for its appearance
     *
     * @remarks
     * Returns an object that fulfills the conditions or waits for its appearance
     *
     * Triggers only once.
     * If object that satisfies the `filter` conditions
     * already exists - returns it immediately.
     * If not - waits for insert/update of data withing the specified `timeout`,
     * and returns it.
     * The projection fields are limited to  `result` fields
     *
     * @param {ParamsOfWaitForCollection} param - parameters
     * @returns ResultOfWaitForCollection
     */
    wait_for_collection(params: ParamsOfWaitForCollection): Promise<ResultOfWaitForCollection>;
    /**
     * Cancels a subscription
     *
     * @remarks
     * Cancels a subscription
     *
     * Cancels a subscription specified by its handle.
     *
     * @param {ResultOfSubscribeCollection} param - parameters
     */
    unsubscribe(params: ResultOfSubscribeCollection): Promise<undefined>;
    /**
     * Creates a subscription
     *
     * @remarks
     * Creates a subscription
     *
     * Triggers for each insert/update of data
     * that satisfies the `filter` conditions.
     * The projection fields are limited to  `result` fields.
     *
     * @param {ParamsOfSubscribeCollection} param - parameters
     * @param {Request} responseHandler - Request callback
     * @returns ResultOfSubscribeCollection
     */
    subscribe_collection(params: ParamsOfSubscribeCollection, responseHandler?: ResponseHandler): Promise<ResultOfSubscribeCollection>;
}
