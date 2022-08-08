import Endpoint from "../../../src/lib/data/endpoint";

describe("Lib / Data / Endpoint", () => {
  test("should be defined", () => {
    expect(Endpoint).toBeDefined();
  });

  test("should query the endpoint", async () => {
    const endpoint = new Endpoint("test", "v0", "json", "token", true);
    const result = await endpoint.query("SELECT * FROM _") as any;

    expect(result.mocked).toBe(true);
  });

  test("return the cached object if an endpoint is queried twice with the same SQL", async () => {
    const sql = "SELECT * FROM _";
    const endpoint = new Endpoint("test", "v0", "json", "token", true);
    const result = await endpoint.query(sql) as any;
    const result2 = await endpoint.query(sql) as any;

    expect(result.mocked).toBe(true);
    expect(result === result2).toBe(true);
  });

});