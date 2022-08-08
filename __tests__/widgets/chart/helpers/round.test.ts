import round from "../../../../src/widgets/chart/helpers/round";

describe("Widgets / Chart / Helper / Round", () => {
  test("should be defined", () => {
    expect(round).toBeDefined();
    expect(typeof round).toBe("function");
  });

  test("rounds a number to the next number which has precision as divisor", () => {
    const number = 17;
    const precision = 10;

    expect(round(number, precision)).toBe(20);
  });

});