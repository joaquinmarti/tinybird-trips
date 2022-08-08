import createSVGElement from "../../../../src/widgets/chart/helpers/create-svg-element";

describe("Widgets / Chart / Helper / Create SVG element", () => {
  test("should be defined", () => {
    expect(createSVGElement).toBeDefined();
    expect(typeof createSVGElement).toBe("function");
  });

  test("creates an svg element", () => {
    const tagName = "svg";

    const svg = createSVGElement(tagName);

    expect(svg).toBeDefined();
    expect(svg.tagName).toBe(tagName);
  });

});