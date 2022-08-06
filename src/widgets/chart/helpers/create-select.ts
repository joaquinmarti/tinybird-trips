import type OptionType from "../types/option";

const createSelect = (name: string, text: string, options: OptionType[]): HTMLDivElement => {
  const div = document.createElement("div");
  const label = document.createElement("label");
  const select = document.createElement("select");

  // Prepare select and the options
  select.setAttribute("name", name);
  options.forEach(({ value, label }: {value: string, label: string}) => {
    const option = document.createElement("option");

    option.setAttribute("value", value);
    option.innerText = label;

    select.appendChild(option);
  });

  // Prepare label with a text node
  label.appendChild(document.createTextNode(text));

  //
  div.appendChild(label);
  div.appendChild(select);

  return div;
};

export default createSelect;