import { SigningBoxHandle } from "../crypto/types";

export type DebotErrorCode =
  | "DebotStartFailed"
  | "DebotFetchFailed"
  | "DebotExecutionFailed"
  | "DebotInvalidHandle"
  | "DebotInvalidJsonParams"
  | "DebotInvalidFunctionId"
  | "DebotInvalidAbi"
  | "DebotGetMethodFailed"
  | "DebotInvalidMsg"
  | "DebotExternalCallFailed"
  | "DebotBrowserCallbackFailed"
  | "DebotOperationRejected";

export type DebotHandle = number;

export type DebotAction = {
  /**
   * description - A short action description.
   */
  description: string;
  /**
   * name - Depends on action type.
   */
  name: string;
  /**
   * action_type - Action type.
   */
  action_type: number;
  /**
   * to - ID of debot context to switch after action execution.
   */
  to: number;
  /**
   * attributes - Action attributes.
   */
  attributes: string;
  /**
   * misc - Some internal action data.
   */
  misc: string;
};

export type DebotInfo = {
  /**
   * name - DeBot short name.
   */
  name?: string;
  /**
   * version - DeBot semantic version.
   */
  version?: string;
  /**
   * publisher - The name of DeBot deployer.
   */
  publisher?: string;
  /**
   * caption - Short info about DeBot.
   */
  caption?: string;
  /**
   * author - The name of DeBot developer.
   */
  author?: string;
  /**
   * support - TON address of author for questions and donations.
   */
  support?: string;
  /**
   * hello - String with the first messsage from DeBot.
   */
  hello?: string;
  /**
   * language - String with DeBot interface language (ISO-639).
   */
  language?: string;
  /**
   * dabi - String with DeBot ABI.
   */
  dabi?: string;
  /**
   * icon - DeBot icon.
   */
  icon?: string;
  /**
   * interfaces - Vector with IDs of DInterfaces used by DeBot.
   */
  interfaces: string[];
};

/**
 * * Transaction - DeBot wants to create new transaction in blockchain.
 * 

*/
export type DebotActivity = {
  type: "Transaction";
  msg: string;
  dst: string;
  out: Spending[];
  fee: number;
  setcode: boolean;
  signkey: string;
};

export type Spending = {
  /**
   * amount - Amount of nanotokens that will be sent to `dst` address.
   */
  amount: number;
  /**
   * dst - Destination address of recipient of funds.
   */
  dst: string;
};

export type ParamsOfInit = {
  /**
   * address - Debot smart contract address
   */
  address: string;
};

export type RegisteredDebot = {
  debot_handle: DebotHandle;
  /**
   * debot_abi - Debot abi as json string.
   */
  debot_abi: string;
  info: DebotInfo;
};

/**
 * Called by debot engine to communicate with debot browser. * * Log - Print message to user.
 * 
 * * Switch - Switch debot to another context (menu).
 * 
 * * SwitchCompleted - Notify browser that all context actions are shown.
 * 
 * * ShowAction - Show action to the user. Called after `switch` for each action in context.
 * 
 * * Input - Request user input.
 * 
 * * GetSigningBox - Get signing box to sign data.
 * 
 * * InvokeDebot - Execute action of another debot.
 * 
 * * Send - Used by Debot to call DInterface implemented by Debot Browser.
 * 
 * * Approve - Requests permission from DeBot Browser to execute DeBot operation.
 * 

*/
export type ParamsOfAppDebotBrowser =
  | {
      type: "Log";
      msg: string;
    }
  | {
      type: "Switch";
      context_id: number;
    }
  | {
      type: "SwitchCompleted";
    }
  | {
      type: "ShowAction";
      action: DebotAction;
    }
  | {
      type: "Input";
      prompt: string;
    }
  | {
      type: "GetSigningBox";
    }
  | {
      type: "InvokeDebot";
      debot_addr: string;
      action: DebotAction;
    }
  | {
      type: "Send";
      message: string;
    }
  | {
      type: "Approve";
      activity: DebotActivity;
    };

/**
 * * Input - Result of user input.
 * 
 * * GetSigningBox - Result of getting signing box.
 * 
 * * InvokeDebot - Result of debot invoking.
 * 
 * * Approve - Result of `approve` callback.
 * 

*/
export type ResultOfAppDebotBrowser =
  | {
      type: "Input";
      value: string;
    }
  | {
      type: "GetSigningBox";
      signing_box: SigningBoxHandle;
    }
  | {
      type: "InvokeDebot";
    }
  | {
      type: "Approve";
      approved: boolean;
    };

export type ParamsOfStart = {
  debot_handle: DebotHandle;
};

export type ParamsOfFetch = {
  /**
   * address - Debot smart contract address.
   */
  address: string;
};

export type ResultOfFetch = {
  info: DebotInfo;
};

export type ParamsOfExecute = {
  debot_handle: DebotHandle;
  action: DebotAction;
};

export type ParamsOfSend = {
  debot_handle: DebotHandle;
  /**
   * message - BOC of internal message to debot encoded in base64 format.
   */
  message: string;
};

export type ParamsOfRemove = {
  debot_handle: DebotHandle;
};
