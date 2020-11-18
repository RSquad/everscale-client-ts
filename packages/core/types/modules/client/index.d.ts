import { TonClient } from "../..";
import { ResultOfGetApiReference, ResultOfVersion, ResultOfBuildInfo } from "./types";
/**
 * Provides information about library.
 *
 * @remarks
 * Provides information about library.
 */
export declare class ClientModule {
    tonClient: TonClient;
    constructor(tonClient: TonClient);
    /**
     * Returns Core Library API reference
     *
     * @remarks
     * Returns Core Library API reference
     */
    get_api_reference(): Promise<ResultOfGetApiReference>;
    /**
     * Returns Core Library version
     *
     * @remarks
     * Returns Core Library version
     */
    version(): Promise<ResultOfVersion>;
    /**
     * Returns detailed information about this build.
     *
     * @remarks
     * Returns detailed information about this build.
     */
    build_info(): Promise<ResultOfBuildInfo>;
}
