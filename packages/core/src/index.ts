import { UtilsModule } from "./utils.module";
import { ClientModule } from "./modules/client";
import { NetModule } from "./modules/net";
import { BocModule } from "./modules/boc";
import { CryptoModule } from "./modules/crypto";
import { AbiModule } from "./modules/abi";
import { ClientConfig } from "./modules/client/types";
import { TonClientError } from "./errors";
import { ProcessingModule } from "./modules/processing";
import { TvmModule } from "./modules/tvm";

export interface BinaryLibrary {
  setResponseHandler(
    handler?: (requestId: number, paramsJson: string, responseType: number, finished: boolean) => void
  ): void;

  createContext(configJson: string): Promise<string>;

  destroyContext(context: number): void;

  sendRequest(context: number, requestId: number, functionName: string, functionParamsJson: string): void;
}

export enum ResponseType {
  Success = 0,
  Error = 1,
  Nop = 2,
  Custom = 100,
}

export type ResponseHandler = (params: any, responseType: ResponseType) => any;

type Request = {
  resolve: (result: any) => void;
  reject: (reason: any) => void;
  responseHandler?: ResponseHandler;
};

export class TonClient {
  readonly client: ClientModule;
  readonly utils: UtilsModule;
  readonly net: NetModule;
  readonly boc: BocModule;
  readonly crypto: CryptoModule;
  readonly abi: AbiModule;
  readonly processing: ProcessingModule;
  readonly tvm: TvmModule;

  protected config: ClientConfig;
  protected context: number | null = null;

  public static TonClientError = TonClientError;

  protected static requests = new Map<number, Request>();
  protected static library: BinaryLibrary | null = null;
  protected static isInitialized = false;
  protected static libraryLoadingPromise: Promise<BinaryLibrary> | null = null;
  protected static lastRequestId: number = 0;

  constructor(config: ClientConfig) {
    this.config = config || {};
    this.client = new ClientModule(this);
    this.utils = new UtilsModule(this);
    this.net = new NetModule(this);
    this.boc = new BocModule(this);
    this.crypto = new CryptoModule(this);
    this.abi = new AbiModule(this);
    this.processing = new ProcessingModule(this);
    this.tvm = new TvmModule(this);
  }

  destroy() {
    if (this.context !== null) {
      TonClient.destroyContext(this.context);
      this.context = null;
    }
  }

  async request(functionName: string, functionParams?: any, responseHandler?: ResponseHandler): Promise<any> {
    if (this.context === null) {
      this.context = await TonClient.createContext(this.config);
    }
    const context = this.context;
    try {
      const library = await TonClient.getLibrary();
      const result = await new Promise((resolve, reject) => {
        const request: Request = { resolve, reject, responseHandler };
        const requestId = TonClient.getRequestId();
        TonClient.requests.set(requestId, request);
        const paramsStr = functionParams === undefined || functionParams === null ? "" : JSON.stringify(functionParams);
        library.sendRequest(context, requestId, functionName, paramsStr);
      });
      return result;
    } catch (error) {
      throw new TonClientError(error.code, error.message, error.data);
    }
  }

  static loadBinaryLibrary(loader: () => Promise<BinaryLibrary>) {
    if (this.isInitialized || this.libraryLoadingPromise !== null) return;

    this.libraryLoadingPromise = loader()
      .then((library) => {
        this.library = library;
        this.isInitialized = true;
        this.library?.setResponseHandler(this.handleRawResponse.bind(this));
        return this.library;
      })
      .catch((reason) => {
        throw new TonClientError(1, "Binary library loading failed.", reason);
      });
  }

  static deinit() {
    if (!this.isInitialized) return;
    this.isInitialized = false;

    this.library?.setResponseHandler();
  }

  protected static async getLibrary(): Promise<BinaryLibrary> {
    if (this.library !== null) return this.library;

    if (this.libraryLoadingPromise !== null && !this.isInitialized) return this.libraryLoadingPromise;

    throw new TonClientError(1, "TON Client is not initialized with binary library.");
  }

  protected static async createContext(config: ClientConfig): Promise<number> {
    const library = await this.getLibrary();

    const responseStr = await library.createContext(JSON.stringify(config)).catch((reason) => {
      throw new TonClientError(1, "Create context failed.", reason);
    });

    const response: {
      result?: any;
      error?: {
        code: number;
        message: string;
        data?: any;
      };
    } = JSON.parse(responseStr);
    const { result, error } = response;

    if (error) {
      throw new TonClientError(error.code, error.message, error.data);
    }
    return result;
  }

  protected static destroyContext(context: number) {
    this.library?.destroyContext(context);
  }

  protected static getRequestId(): number {
    let newId = this.lastRequestId + 1;
    while (this.requests.has(newId)) {
      newId += 1;
      if (newId >= Number.MAX_SAFE_INTEGER) {
        newId = 1;
      }
    }
    this.lastRequestId = newId;
    return newId;
  }

  protected static handleRawResponse(requestId: number, paramsJson: string, responseType: number, finished: boolean) {
    const request = this.requests.get(requestId);
    if (!request) {
      return;
    }
    if (finished) {
      this.requests.delete(requestId);
    }
    const params = paramsJson !== "" ? JSON.parse(paramsJson) : undefined;
    switch (responseType) {
      case ResponseType.Success:
        request.resolve(params);
        break;
      case ResponseType.Error:
        request.reject(params);
        break;
      default:
        if (responseType >= ResponseType.Custom && request.responseHandler) {
          request.responseHandler(params, responseType);
        }
        break;
    }
  }
}

export default TonClient;
