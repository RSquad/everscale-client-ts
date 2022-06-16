import { TonClient } from "../..";
import {
  ResultOfGetApiReference,
  ResultOfVersion,
  ClientConfig,
  ResultOfBuildInfo,
  ParamsOfResolveAppRequest,
} from "./types";

/**
 * Provides information about library.
 */
export class ClientModule {
  tonClient: TonClient;
  constructor(tonClient: TonClient) {
    this.tonClient = tonClient;
  }

  /**
   * Returns Core Library API reference
   */
  get_api_reference(): Promise<ResultOfGetApiReference> {
    return this.tonClient.request("client.get_api_reference");
  }

  /**
   * Returns Core Library version
   */
  version(): Promise<ResultOfVersion> {
    return this.tonClient.request("client.version");
  }

  /**
   * Returns Core Library API reference
   */
  config(): Promise<ClientConfig> {
    return this.tonClient.request("client.config");
  }

  /**
   * Returns detailed information about this build.
   */
  build_info(): Promise<ResultOfBuildInfo> {
    return this.tonClient.request("client.build_info");
  }

  /**
   * Resolves application request processing result
   *
   * @param {ParamsOfResolveAppRequest} param - parameters
   */
  resolve_app_request(params: ParamsOfResolveAppRequest): Promise<undefined> {
    return this.tonClient.request("client.resolve_app_request", params);
  }
}
