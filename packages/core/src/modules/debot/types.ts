import { SigningBoxHandle } from "../crypto/types";

export type DebotErrorCode =
  | "DebotStartFailed"
  | "DebotFetchFailed"
  | "DebotExecutionFailed"
  | "DebotInvalidHandle";

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

export type ParamsOfStart = {
  /**
   * address - Debot smart contract address
   */
  address: string;
};

export type RegisteredDebot = {
  debot_handle: DebotHandle;
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
    };

/**
 * * Input - Result of user input.
 * 
 * * GetSigningBox - Result of getting signing box.
 * 
 * * InvokeDebot - Result of debot invoking.
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
    };

export type ParamsOfFetch = {
  /**
   * address - Debot smart contract address
   */
  address: string;
};

export type ParamsOfExecute = {
  debot_handle: DebotHandle;
  action: DebotAction;
};
