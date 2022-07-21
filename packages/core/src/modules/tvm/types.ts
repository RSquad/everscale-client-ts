import { Abi } from "../abi/types";
import { BocCacheType } from "../boc/types";
import { DecodedOutput } from "../processing/types";

export type TvmErrorCode =
  | "CanNotReadTransaction"
  | "CanNotReadBlockchainConfig"
  | "TransactionAborted"
  | "InternalError"
  | "ActionPhaseFailed"
  | "AccountCodeMissing"
  | "LowBalance"
  | "AccountFrozenOrDeleted"
  | "AccountMissing"
  | "UnknownExecutionError"
  | "InvalidInputStack"
  | "InvalidAccountBoc"
  | "InvalidMessageType"
  | "ContractExecutionError";

export type ExecutionOptions = {
  /**
   * blockchain_config - boc with config
   */
  blockchain_config?: string;
  /**
   * block_time - time that is used as transaction time
   */
  block_time?: number;
  /**
   * block_lt - block logical time
   */
  block_lt?: number;
  /**
   * transaction_lt - transaction logical time
   */
  transaction_lt?: number;
  /**
   * chksig_always_succeed - Overrides standard TVM behaviour. If set to `true` then CHKSIG always will return `true`.
   */
  chksig_always_succeed?: boolean;
};

/**
 * * None - Non-existing account to run a creation internal message. Should be used with `skip_transaction_check = true` if the message has no deploy data since transactions on the uninitialized account are always aborted
 * 
 * * Uninit - Emulate uninitialized account to run deploy message
 * 
 * * Account - Account state to run message
 * 

*/
export type AccountForExecutor =
  | {
      type: "None";
    }
  | {
      type: "Uninit";
    }
  | {
      type: "Account";
      boc: string;
      unlimited_balance?: boolean;
    };

export type TransactionFees = {
  /**
   * in_msg_fwd_fee - Deprecated.
   */
  in_msg_fwd_fee: number;
  /**
   * storage_fee - Fee for account storage
   */
  storage_fee: number;
  /**
   * gas_fee - Fee for processing
   */
  gas_fee: number;
  /**
   * out_msgs_fwd_fee - Deprecated.
   */
  out_msgs_fwd_fee: number;
  /**
   * total_account_fees - Deprecated.
   */
  total_account_fees: number;
  /**
   * total_output - Deprecated because it means total value sent in the transaction, which does not relate to any fees.
   */
  total_output: number;
  /**
   * ext_in_msg_fee - Fee for inbound external message import.
   */
  ext_in_msg_fee: number;
  /**
   * total_fwd_fees - Total fees the account pays for message forwarding
   */
  total_fwd_fees: number;
  /**
   * account_fees - Total account fees for the transaction execution. Compounds of storage_fee + gas_fee + ext_in_msg_fee + total_fwd_fees
   */
  account_fees: number;
};

export type ParamsOfRunExecutor = {
  /**
   * message - Input message BOC.
   */
  message: string;
  account: AccountForExecutor;
  /**
   * execution_options - Execution options.
   */
  execution_options?: ExecutionOptions;
  /**
   * abi - Contract ABI for decoding output messages
   */
  abi?: Abi;
  /**
   * skip_transaction_check - Skip transaction check flag
   */
  skip_transaction_check?: boolean;
  /**
   * boc_cache - Cache type to put the result.
   */
  boc_cache?: BocCacheType;
  /**
   * return_updated_account - Return updated account flag.
   */
  return_updated_account?: boolean;
};

export type ResultOfRunExecutor = {
  transaction: any;
  /**
   * out_messages - List of output messages' BOCs.
   */
  out_messages: string[];
  /**
   * decoded - Optional decoded message bodies according to the optional `abi` parameter.
   */
  decoded?: DecodedOutput;
  /**
   * account - Updated account state BOC.
   */
  account: string;
  fees: TransactionFees;
};

export type ParamsOfRunTvm = {
  /**
   * message - Input message BOC.
   */
  message: string;
  /**
   * account - Account BOC.
   */
  account: string;
  /**
   * execution_options - Execution options.
   */
  execution_options?: ExecutionOptions;
  /**
   * abi - Contract ABI for decoding output messages
   */
  abi?: Abi;
  /**
   * boc_cache - Cache type to put the result.
   */
  boc_cache?: BocCacheType;
  /**
   * return_updated_account - Return updated account flag.
   */
  return_updated_account?: boolean;
};

export type ResultOfRunTvm = {
  /**
   * out_messages - List of output messages' BOCs.
   */
  out_messages: string[];
  /**
   * decoded - Optional decoded message bodies according to the optional `abi` parameter.
   */
  decoded?: DecodedOutput;
  /**
   * account - Updated account state BOC.
   */
  account: string;
};

export type ParamsOfRunGet = {
  /**
   * account - Account BOC in `base64`
   */
  account: string;
  /**
   * function_name - Function name
   */
  function_name: string;
  /**
   * input - Input parameters
   */
  input?: any;
  /**
   * execution_options - Execution options
   */
  execution_options?: ExecutionOptions;
  /**
   * tuple_list_as_array - Convert lists based on nested tuples in the **result** into plain arrays.
   */
  tuple_list_as_array?: boolean;
};

export type ResultOfRunGet = {
  output: any;
};
