import EndpointManager from "../../../src/lib/data/endpoints-manager";
import Endpoint from "../../../src/lib/data/endpoint";

describe("Lib / Data / Endpoints Manager", () => {
  test("should be defined", () => {
    expect(EndpointManager).toBeDefined();
  });

  test("creates a new endpoint and returns it", () => {
    const endpointName = "endpoint-name";

    const endpointsManager = new EndpointManager("token");
    const endpoint = endpointsManager.createEndpoint(endpointName);

    expect(endpoint).toBeDefined();
    expect(endpoint instanceof Endpoint).toBe(true);
  });

  test("returns the same endpoint if it's created twice", () => {
    const endpointName = "endpoint-name";

    const endpointsManager = new EndpointManager("token");
    const endpoint = endpointsManager.createEndpoint(endpointName);
    const endpoint2 = endpointsManager.createEndpoint(endpointName);

    expect(endpoint).toBeDefined();
    expect(endpoint2).toBeDefined();
    expect(endpoint === endpoint2).toBe(true);
  });
});