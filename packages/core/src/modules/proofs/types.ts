export type ProofsErrorCode =
  | "InvalidData"
  | "ProofCheckFailed"
  | "InternalError"
  | "DataDiffersFromProven";

export type ParamsOfProofBlockData = {
  block: any;
};

export type ParamsOfProofTransactionData = {
  transaction: any;
};

export type ParamsOfProofMessageData = {
  message: any;
};
