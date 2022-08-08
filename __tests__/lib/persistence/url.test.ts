import UrlPersistence from "../../../src/lib/persistence/url";

describe("Lib / Persistence / URL", () => {
  test("should be defined", () => {
    expect(UrlPersistence).toBeDefined();
  });

  test("should get an initial empty state", () => {
    const persistence = new UrlPersistence();
    const state = persistence.get();

    expect(state).toEqual({});
  });

  test("should save a name/value pair in the state when set", () => {
    const key = "key";
    const value = "value";
    const persistence = new UrlPersistence();

    persistence.set(key, value);

    const state = persistence.get();
    expect(state).toEqual({ [key]: value });
  });

  test("should update a name/value pair in the state when set twice", () => {
    const key = "key";
    const value = "value";
    const value2 = "value2";
    const persistence = new UrlPersistence();

    persistence.set(key, value);

    let state = persistence.get();
    expect(state).toEqual({ [key]: value });

    persistence.set(key, value2);

    state = persistence.get();
    expect(state).toEqual({ [key]: value2 });
  });

});