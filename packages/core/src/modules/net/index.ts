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
  ResultOfGetEndpoints,
  ParamsOfQueryCounterparties,
  ParamsOfQueryTransactionTree,
  ResultOfQueryTransactionTree,
  ParamsOfCreateBlockIterator,
  RegisteredIterator,
  ParamsOfResumeBlockIterator,
  ParamsOfCreateTransactionIterator,
  ParamsOfResumeTransactionIterator,
  ParamsOfIteratorNext,
  ResultOfIteratorNext,
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
   * Requests the list of alternative endpoints from server
   */
  get_endpoints(): Promise<ResultOfGetEndpoints> {
    return this.tonClient.request("net.get_endpoints");
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

  /**
   * Returns a tree of transactions triggered by a specific message.
   *
   * @remarks
   * Performs recursive retrieval of a transactions tree produced by a specific message:
   * in_msg -> dst_transaction -> out_messages -> dst_transaction -> ...
   * If the chain of transactions execution is in progress while the function is running,
   * it will wait for the next transactions to appear until the full tree or more than 50 transactions
   * are received.
   *
   * All the retrieved messages and transactions are included
   * into `result.messages` and `result.transactions` respectively.
   *
   * Function reads transactions layer by layer, by pages of 20 transactions.
   *
   * The retrieval prosess goes like this:
   * Let's assume we have an infinite chain of transactions and each transaction generates 5 messages.
   * 1. Retrieve 1st message (input parameter) and corresponding transaction - put it into result.
   * It is the first level of the tree of transactions - its root.
   * Retrieve 5 out message ids from the transaction for next steps.
   * 2. Retrieve 5 messages and corresponding transactions on the 2nd layer. Put them into result.
   * Retrieve 5*5 out message ids from these transactions for next steps
   * 3. Retrieve 20 (size of the page) messages and transactions (3rd layer) and 20*5=100 message ids (4th layer).
   * 4. Retrieve the last 5 messages and 5 transactions on the 3rd layer + 15 messages and transactions (of 100) from the 4th layer
   * + 25 message ids of the 4th layer + 75 message ids of the 5th layer.
   * 5. Retrieve 20 more messages and 20 more transactions of the 4th layer + 100 more message ids of the 5th layer.
   * 6. Now we have 1+5+20+20+20 = 66 transactions, which is more than 50. Function exits with the tree of
   * 1m->1t->5m->5t->25m->25t->35m->35t. If we see any message ids in the last transactions out_msgs, which don't have
   * corresponding messages in the function result, it means that the full tree was not received and we need to continue iteration.
   *
   * To summarize, it is guaranteed that each message in `result.messages` has the corresponding transaction
   * in the `result.transactions`.
   * But there is no guarantee that all messages from transactions `out_msgs` are
   * presented in `result.messages`.
   * So the application has to continue retrieval for missing messages if it requires.
   *
   * @param {ParamsOfQueryTransactionTree} param - parameters
   * @returns ResultOfQueryTransactionTree
   */
  query_transaction_tree(
    params: ParamsOfQueryTransactionTree
  ): Promise<ResultOfQueryTransactionTree> {
    return this.tonClient.request("net.query_transaction_tree", params);
  }

  /**
   * Creates block iterator.
   *
   * @remarks
   * Block iterator uses robust iteration methods that guaranties that every
   * block in the specified range isn't missed or iterated twice.
   *
   * Iterated range can be reduced with some filters:
   * - `start_time` – the bottom time range. Only blocks with `gen_utime`
   * more or equal to this value is iterated. If this parameter is omitted then there is
   * no bottom time edge, so all blocks since zero state is iterated.
   * - `end_time` – the upper time range. Only blocks with `gen_utime`
   * less then this value is iterated. If this parameter is omitted then there is
   * no upper time edge, so iterator never finishes.
   * - `shard_filter` – workchains and shard prefixes that reduce the set of interesting
   * blocks. Block conforms to the shard filter if it belongs to the filter workchain
   * and the first bits of block's `shard` fields matches to the shard prefix.
   * Only blocks with suitable shard are iterated.
   *
   * Items iterated is a JSON objects with block data. The minimal set of returned
   * fields is:
   * ```text
   * id
   * gen_utime
   * workchain_id
   * shard
   * after_split
   * after_merge
   * prev_ref {
   * root_hash
   * }
   * prev_alt_ref {
   * root_hash
   * }
   * ```
   * Application can request additional fields in the `result` parameter.
   *
   * Application should call the `remove_iterator` when iterator is no longer required.
   *
   * @param {ParamsOfCreateBlockIterator} param - parameters
   * @returns RegisteredIterator
   */
  create_block_iterator(
    params: ParamsOfCreateBlockIterator
  ): Promise<RegisteredIterator> {
    return this.tonClient.request("net.create_block_iterator", params);
  }

  /**
   * Resumes block iterator.
   *
   * @remarks
   * The iterator stays exactly at the same position where the `resume_state` was catched.
   *
   * Application should call the `remove_iterator` when iterator is no longer required.
   *
   * @param {ParamsOfResumeBlockIterator} param - parameters
   * @returns RegisteredIterator
   */
  resume_block_iterator(
    params: ParamsOfResumeBlockIterator
  ): Promise<RegisteredIterator> {
    return this.tonClient.request("net.resume_block_iterator", params);
  }

  /**
   * Creates transaction iterator.
   *
   * @remarks
   * Transaction iterator uses robust iteration methods that guaranty that every
   * transaction in the specified range isn't missed or iterated twice.
   *
   * Iterated range can be reduced with some filters:
   * - `start_time` – the bottom time range. Only transactions with `now`
   * more or equal to this value are iterated. If this parameter is omitted then there is
   * no bottom time edge, so all the transactions since zero state are iterated.
   * - `end_time` – the upper time range. Only transactions with `now`
   * less then this value are iterated. If this parameter is omitted then there is
   * no upper time edge, so iterator never finishes.
   * - `shard_filter` – workchains and shard prefixes that reduce the set of interesting
   * accounts. Account address conforms to the shard filter if
   * it belongs to the filter workchain and the first bits of address match to
   * the shard prefix. Only transactions with suitable account addresses are iterated.
   * - `accounts_filter` – set of account addresses whose transactions must be iterated.
   * Note that accounts filter can conflict with shard filter so application must combine
   * these filters carefully.
   *
   * Iterated item is a JSON objects with transaction data. The minimal set of returned
   * fields is:
   * ```text
   * id
   * account_addr
   * now
   * balance_delta(format:DEC)
   * bounce { bounce_type }
   * in_message {
   * id
   * value(format:DEC)
   * msg_type
   * src
   * }
   * out_messages {
   * id
   * value(format:DEC)
   * msg_type
   * dst
   * }
   * ```
   * Application can request an additional fields in the `result` parameter.
   *
   * Another parameter that affects on the returned fields is the `include_transfers`.
   * When this parameter is `true` the iterator computes and adds `transfer` field containing
   * list of the useful `TransactionTransfer` objects.
   * Each transfer is calculated from the particular message related to the transaction
   * and has the following structure:
   * - message – source message identifier.
   * - isBounced – indicates that the transaction is bounced, which means the value will be returned back to the sender.
   * - isDeposit – indicates that this transfer is the deposit (true) or withdraw (false).
   * - counterparty – account address of the transfer source or destination depending on `isDeposit`.
   * - value – amount of nano tokens transferred. The value is represented as a decimal string
   * because the actual value can be more precise than the JSON number can represent. Application
   * must use this string carefully – conversion to number can follow to loose of precision.
   *
   * Application should call the `remove_iterator` when iterator is no longer required.
   *
   * @param {ParamsOfCreateTransactionIterator} param - parameters
   * @returns RegisteredIterator
   */
  create_transaction_iterator(
    params: ParamsOfCreateTransactionIterator
  ): Promise<RegisteredIterator> {
    return this.tonClient.request("net.create_transaction_iterator", params);
  }

  /**
   * Resumes transaction iterator.
   *
   * @remarks
   * The iterator stays exactly at the same position where the `resume_state` was caught.
   * Note that `resume_state` doesn't store the account filter. If the application requires
   * to use the same account filter as it was when the iterator was created then the application
   * must pass the account filter again in `accounts_filter` parameter.
   *
   * Application should call the `remove_iterator` when iterator is no longer required.
   *
   * @param {ParamsOfResumeTransactionIterator} param - parameters
   * @returns RegisteredIterator
   */
  resume_transaction_iterator(
    params: ParamsOfResumeTransactionIterator
  ): Promise<RegisteredIterator> {
    return this.tonClient.request("net.resume_transaction_iterator", params);
  }

  /**
   * Returns next available items.
   *
   * @remarks
   * In addition to available items this function returns the `has_more` flag
   * indicating that the iterator isn't reach the end of the iterated range yet.
   *
   * This function can return the empty list of available items but
   * indicates that there are more items is available.
   * This situation appears when the iterator doesn't reach iterated range
   * but database doesn't contains available items yet.
   *
   * If application requests resume state in `return_resume_state` parameter
   * then this function returns `resume_state` that can be used later to
   * resume the iteration from the position after returned items.
   *
   * The structure of the items returned depends on the iterator used.
   * See the description to the appropriated iterator creation function.
   *
   * @param {ParamsOfIteratorNext} param - parameters
   * @returns ResultOfIteratorNext
   */
  iterator_next(params: ParamsOfIteratorNext): Promise<ResultOfIteratorNext> {
    return this.tonClient.request("net.iterator_next", params);
  }

  /**
   * Removes an iterator
   *
   * @remarks
   * Frees all resources allocated in library to serve iterator.
   *
   * Application always should call the `remove_iterator` when iterator
   * is no longer required.
   *
   * @param {RegisteredIterator} param - parameters
   */
  remove_iterator(params: RegisteredIterator): Promise<undefined> {
    return this.tonClient.request("net.remove_iterator", params);
  }
}
