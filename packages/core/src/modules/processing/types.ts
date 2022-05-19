import { ClientError } from "../client/types";
import { TransactionFees } from "../tvm/types";
import { DecodedMessageBody, Abi, ParamsOfEncodeMessage } from "../abi/types";

export type ProcessingErrorCode =
  | "MessageAlreadyExpired"
  | "MessageHasNotDestinationAddress"
  | "CanNotBuildMessageCell"
  | "FetchBlockFailed"
  | "SendMessageFailed"
  | "InvalidMessageBoc"
  | "MessageExpired"
  | "TransactionWaitTimeout"
  | "InvalidBlockReceived"
  | "CanNotCheckBlockShard"
  | "BlockNotFound"
  | "InvalidData"
  | "ExternalSignerMustNotBeUsed"
  | "MessageRejected"
  | "InvalidRempStatus"
  | "NextRempStatusTimeout";

/**
 * * WillFetchFirstBlock - Notifies the application that the account's current shard block will be fetched from the network. This step is performed before the message sending so that sdk knows starting from which block it will search for the transaction.
 * 
 * * FetchFirstBlockFailed - Notifies the app that the client has failed to fetch the account's current shard block.
 * 
 * * WillSend - Notifies the app that the message will be sent to the network. This event means that the account's current shard block was successfully fetched and the message was successfully created (`abi.encode_message` function was executed successfully).
 * 
 * * DidSend - Notifies the app that the message was sent to the network, i.e `processing.send_message` was successfuly executed. Now, the message is in the blockchain. If Application exits at this phase, Developer needs to proceed with processing after the application is restored with `wait_for_transaction` function, passing shard_block_id and message from this event.
 * 
 * * SendFailed - Notifies the app that the sending operation was failed with network error.
 * 
 * * WillFetchNextBlock - Notifies the app that the next shard block will be fetched from the network.
 * 
 * * FetchNextBlockFailed - Notifies the app that the next block can't be fetched.
 * 
 * * MessageExpired - Notifies the app that the message was not executed within expire timeout on-chain and will never be because it is already expired. The expiration timeout can be configured with `AbiConfig` parameters.
 * 
 * * RempSentToValidators - Notifies the app that the message has been delivered to the thread's validators
 * 
 * * RempIncludedIntoBlock - Notifies the app that the message has been successfully included into a block candidate by the thread's collator
 * 
 * * RempIncludedIntoAcceptedBlock - Notifies the app that the block candicate with the message has been accepted by the thread's validators
 * 
 * * RempOther - Notifies the app about some other minor REMP statuses occurring during message processing
 * 
 * * RempError - Notifies the app about any problem that has occured in REMP processing - in this case library switches to the fallback transaction awaiting scenario (sequential block reading).
 * 

*/
export type ProcessingEvent =
  | {
      type: "WillFetchFirstBlock";
    }
  | {
      type: "FetchFirstBlockFailed";
      error: ClientError;
    }
  | {
      type: "WillSend";
      shard_block_id: string;
      message_id: string;
      message: string;
    }
  | {
      type: "DidSend";
      shard_block_id: string;
      message_id: string;
      message: string;
    }
  | {
      type: "SendFailed";
      shard_block_id: string;
      message_id: string;
      message: string;
      error: ClientError;
    }
  | {
      type: "WillFetchNextBlock";
      shard_block_id: string;
      message_id: string;
      message: string;
    }
  | {
      type: "FetchNextBlockFailed";
      shard_block_id: string;
      message_id: string;
      message: string;
      error: ClientError;
    }
  | {
      type: "MessageExpired";
      message_id: string;
      message: string;
      error: ClientError;
    }
  | {
      type: "RempSentToValidators";
      message_id: string;
      timestamp: number;
      json: any;
    }
  | {
      type: "RempIncludedIntoBlock";
      message_id: string;
      timestamp: number;
      json: any;
    }
  | {
      type: "RempIncludedIntoAcceptedBlock";
      message_id: string;
      timestamp: number;
      json: any;
    }
  | {
      type: "RempOther";
      message_id: string;
      timestamp: number;
      json: any;
    }
  | {
      type: "RempError";
      error: ClientError;
    };

export type ResultOfProcessMessage = {
  transaction: any;
  /**
   * out_messages - List of output messages' BOCs.
   */
  out_messages: string[];
  /**
   * decoded - Optional decoded message bodies according to the optional `abi` parameter.
   */
  decoded?: DecodedOutput;
  fees: TransactionFees;
};

export type DecodedOutput = {
  /**
   * out_messages - Decoded bodies of the out messages.
   */
  out_messages: DecodedMessageBody[];
  /**
   * output - Decoded body of the function output message.
   */
  output?: any;
};

export type ParamsOfSendMessage = {
  /**
   * message - Message BOC.
   */
  message: string;
  /**
   * abi - Optional message ABI.
   */
  abi?: Abi;
  /**
   * send_events - Flag for requesting events sending
   */
  send_events: boolean;
};

export type ResultOfSendMessage = {
  /**
   * shard_block_id - The last generated shard block of the message destination account before the message was sent.
   */
  shard_block_id: string;
  /**
   * sending_endpoints - The list of endpoints to which the message was sent.
   */
  sending_endpoints: string[];
};

export type ParamsOfWaitForTransaction = {
  /**
   * abi - Optional ABI for decoding the transaction result.
   */
  abi?: Abi;
  /**
   * message - Message BOC.
   */
  message: string;
  /**
   * shard_block_id - The last generated block id of the destination account shard before the message was sent.
   */
  shard_block_id: string;
  /**
   * send_events - Flag that enables/disables intermediate events
   */
  send_events: boolean;
  /**
   * sending_endpoints - The list of endpoints to which the message was sent.
   */
  sending_endpoints?: string[];
};

export type ParamsOfProcessMessage = {
  message_encode_params: ParamsOfEncodeMessage;
  /**
   * send_events - Flag for requesting events sending
   */
  send_events: boolean;
};
