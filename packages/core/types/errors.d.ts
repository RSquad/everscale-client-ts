export declare class TonClientError extends Error {
    code: number;
    data?: any;
    constructor(code: number, message: string, data?: any);
}
