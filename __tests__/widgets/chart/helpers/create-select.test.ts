import createSelect from "../../../../src/widgets/chart/helpers/create-select";

describe("Widgets / Chart / Helper / Create select", () => {
  test("should be defined", () => {
    expect(createSelect).toBeDefined();
    expect(typeof createSelect).toBe("function");
  });

  test("creates a select element", () => {
    const name = "name";
    const text = "label";
    const options = [
      { value: "1", label: "Test 1" },
      { value: "2", label: "Test 2" },
      { value: "3", label: "Test 3" }
    ];

    const div = createSelect(name, text, options);

    expect(div).toBeDefined();
    expect(div.tagName).toBe("DIV");
    expect(div.classList.contains("dropdown")).toBe(true);
    expect(div.querySelector("label").innerText).toBe(text);
    expect(div.querySelector("select").name).toBe(name);
    expect(div.querySelector("option").value).toBe(options[0].value);
    expect(div.querySelector("option").innerText).toBe(options[0].label);
  });

});