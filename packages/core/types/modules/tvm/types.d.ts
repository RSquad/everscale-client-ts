import { Abi } from "../abi/types";
import { DecodedOutput } from "../processing/types";
export declare type ExecutionOptions = {
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
 * * None - Non-existing account to run a creation internal message.
 *
 * * Uninit - Emulate unitialized account to run deploy message
 *
 * * Account - Account state to run message
 *

*/
export declare type AccountForExecutor = {
    type: "None";
} | {
    type: "Uninit";
} | {
    type: "Account";
    boc: string;
    unlimited_balance?: boolean;
};
export declare type TransactionFees = {
    in_msg_fwd_fee: number;
    storage_fee: number;
    gas_fee: number;
    out_msgs_fwd_fee: number;
    total_account_fees: number;
    total_output: number;
};
export declare type ParamsOfRunExecutor = {
    /**
     * message - Input message BOC. Must be encoded as base64.
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
export declare type ResultOfRunExecutor = {
    transaction: any;
    /**
     * out_messages - List of output messages' BOCs. Encoded as `base64`
     */
    out_messages: string[];
    /**
     * decoded - Optional decoded message bodies according to the optional
     */
    decoded?: DecodedOutput;
    /**
     * account - Updated account state BOC. Encoded as `base64`
     */
    account: string;
    fees: TransactionFees;
};
export declare type ParamsOfRunTvm = {
    /**
     * message - Input message BOC. Must be encoded as base64.
     */
    message: string;
    /**
     * account - Account BOC. Must be encoded as base64.
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
export declare type ResultOfRunTvm = {
    /**
     * out_messages - List of output messages' BOCs. Encoded as `base64`
     */
    out_messages: string[];
    /**
     * decoded - Optional decoded message bodies according to the optional
     */
    decoded?: DecodedOutput;
    /**
     * account - Updated account state BOC. Encoded as `base64`.
     */
    account: string;
};
export declare type ParamsOfRunGet = {
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
export declare type ResultOfRunGet = {
    output: any;
};
