import DataCache from "../../../src/lib/data/data-cache";

describe("Lib / Data / Data Cache", () => {
  test("should be defined", () => {
    expect(DataCache).toBeDefined();
  });

  test("defines set() method", () => {
    const cache = new DataCache<string>();
    expect(typeof cache.set).toBe("function");
  });


  test("defines get() method", () => {
    const cache = new DataCache();
    expect(typeof cache.get).toBe("function");
  });

  test("defines has() method", () => {
    const cache = new DataCache();
    expect(typeof cache.has).toBe("function");
  });

  test("sets a new element and checks its presence", () => {
    const key = "key";
    const cache = new DataCache<string>();

    expect(cache.has(key)).toBe(false);
    cache.set(key, "value");
    expect(cache.has(key)).toBe(true);
  });

  test("sets a new element and retrieves it", () => {
    const key = "key";
    const value = "value";
    const cache = new DataCache<string>();

    expect(cache.get(key)).toBe(undefined);
    cache.set(key, value);
    expect(cache.get(key)).toBe(value);
  });
});