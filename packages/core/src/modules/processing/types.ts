import { ClientError } from "../client/types";
import { TransactionFees } from "../tvm/types";
import { DecodedMessageBody, Abi, ParamsOfEncodeMessage } from "../abi/types";
/**
 * * WillFetchFirstBlock - Notifies the app that the current shard block will be fetched
 * 
 * * FetchFirstBlockFailed - Notifies the app that the client has failed to fetch current
 * 
 * * WillSend - Notifies the app that the message will be sent to the
 * 
 * * DidSend - Notifies the app that the message was sent to the network.
 * 
 * * SendFailed - Notifies the app that the sending operation was failed with
 * 
 * * WillFetchNextBlock - Notifies the app that the next shard block will be fetched
 * 
 * * FetchNextBlockFailed - Notifies the app that the next block can't be fetched due to
 * 
 * * MessageExpired - Notifies the app that the message was expired.
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
    };

export type ResultOfProcessMessage = {
  transaction: any;
  /**
   * out_messages - List of output messages' BOCs. Encoded as `base64`
   */
  out_messages: string[];
  /**
   * decoded - Optional decoded message bodies according to the optional
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
   * shard_block_id - The last generated shard block of the message destination account before the
   */
  shard_block_id: string;
};

export type ParamsOfWaitForTransaction = {
  /**
   * abi - Optional ABI for decoding the transaction result.
   */
  abi?: Abi;
  /**
   * message - Message BOC. Encoded with `base64`.
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
};

export type ParamsOfProcessMessage = {
  message_encode_params: ParamsOfEncodeMessage;
  /**
   * send_events - Flag for requesting events sending
   */
  send_events: boolean;
};
