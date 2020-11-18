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
    setResponseHandler(handler?: (requestId: number, paramsJson: string, responseType: number, finished: boolean) => void): void;
    createContext(configJson: string): Promise<string>;
    destroyContext(context: number): void;
    sendRequest(context: number, requestId: number, functionName: string, functionParamsJson: string): void;
}
export declare enum ResponseType {
    Success = 0,
    Error = 1,
    Nop = 2,
    Custom = 100
}
export declare type ResponseHandler = (params: any, responseType: ResponseType) => any;
declare type Request = {
    resolve: (result: any) => void;
    reject: (reason: any) => void;
    responseHandler?: ResponseHandler;
};
export declare class TonClient {
    readonly client: ClientModule;
    readonly utils: UtilsModule;
    readonly net: NetModule;
    readonly boc: BocModule;
    readonly crypto: CryptoModule;
    readonly abi: AbiModule;
    readonly processing: ProcessingModule;
    readonly tvm: TvmModule;
    protected config: ClientConfig;
    protected context: number | null;
    static TonClientError: typeof TonClientError;
    protected static requests: Map<number, Request>;
    protected static library: BinaryLibrary | null;
    protected static isInitialized: boolean;
    protected static libraryLoadingPromise: Promise<BinaryLibrary> | null;
    protected static lastRequestId: number;
    constructor(config: ClientConfig);
    destroy(): void;
    request(functionName: string, functionParams?: any, responseHandler?: ResponseHandler): Promise<any>;
    static loadBinaryLibrary(loader: () => Promise<BinaryLibrary>): void;
    static deinit(): void;
    protected static getLibrary(): Promise<BinaryLibrary>;
    protected static createContext(config: ClientConfig): Promise<number>;
    protected static destroyContext(context: number): void;
    protected static getRequestId(): number;
    protected static handleRawResponse(requestId: number, paramsJson: string, responseType: number, finished: boolean): void;
}
export default TonClient;
