import Endpoint from "./endpoint";
import type EndpointFormat from "./query-format";

export default class EndpointsManager {
  protected endpoints: Map<string, Endpoint>;

  constructor(protected token: string) {
    this.endpoints = new Map();
  }

  createEndpoint(name: string, type: EndpointFormat = "json", version: string = "v0"): Endpoint {
    const key = `${name}.${type}@${version}`;

    // Start the endpoint just once for the same name, type and version
    if (!this.endpoints.get(key)) {
      this.endpoints.set(key, new Endpoint(name, version, type, this.token));
    }

    return this.endpoints.get(key);
  }
}