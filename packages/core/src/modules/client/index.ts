import { TonClient } from "../..";
import {
  ResultOfGetApiReference,
  ResultOfVersion,
  ResultOfBuildInfo,
} from "./types";

/**
 * Provides information about library.
 *
 * @remarks
 * Provides information about library.
 */
export class ClientModule {
  tonClient: TonClient;
  constructor(tonClient: TonClient) {
    this.tonClient = tonClient;
  }

  /**
   * Returns Core Library API reference
   *
   * @remarks
   * Returns Core Library API reference
   */
  get_api_reference(): Promise<ResultOfGetApiReference> {
    return this.tonClient.request("client.get_api_reference");
  }

  /**
   * Returns Core Library version
   *
   * @remarks
   * Returns Core Library version
   */
  version(): Promise<ResultOfVersion> {
    return this.tonClient.request("client.version");
  }

  /**
   * Returns detailed information about this build.
   *
   * @remarks
   * Returns detailed information about this build.
   */
  build_info(): Promise<ResultOfBuildInfo> {
    return this.tonClient.request("client.build_info");
  }
}
