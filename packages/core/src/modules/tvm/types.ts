import { Abi } from "../abi/types";
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
  in_msg_fwd_fee: number;
  storage_fee: number;
  gas_fee: number;
  out_msgs_fwd_fee: number;
  total_account_fees: number;
  total_output: number;
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
   * abi - Contract ABI for dedcoding output messages
   */
  abi?: Abi;
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
  execution_options?: ExecutionOptions;
};

export type ResultOfRunGet = {
  output: any;
};
