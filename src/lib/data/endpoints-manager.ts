import Endpoint from "./endpoint";
import type EndpointFormat from "../types/query-format";

// An instance of this class can handle several endpoints. It is useful from the architecture
// point of view because the same token could provide access to more than one endpoint.

export default class EndpointsManager {
  protected endpoints: Map<string, Endpoint>;

  constructor(protected token: string) {
    this.endpoints = new Map();
  }

  // Returns the instance of an endpoint as a combination of pipe, type and version
  createEndpoint(name: string, enableCache: boolean = true, type: EndpointFormat = "json", version: string = "v0"): Endpoint {
    const key = `${name}.${type}@${version}`;

    // Start the endpoint just once for the same name, type and version
    if (!this.endpoints.get(key)) {
      this.endpoints.set(key, new Endpoint(name, version, type, this.token, enableCache));
    }

    return this.endpoints.get(key);
  }
}