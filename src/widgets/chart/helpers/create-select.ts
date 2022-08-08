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
  label.innerText = text;

  // Append the label and the select to the parent div
  div.appendChild(label);
  div.appendChild(select);

  // We need to dispatch a custom event because the native
  // change event has the composed property set to false and it
  // doesn't bubble up to the main DOM. With the custom event we can set
  // compose to true and listen the event from the main DOM
  select.addEventListener("change", (event) => {
    const changeEvent = new CustomEvent("chart-dropdown-change", {
      detail: {
        sourceEvent: event
      },
      composed: true,
      bubbles: event.bubbles,
      cancelable: event.cancelable
    });

    select.dispatchEvent(changeEvent);
  });

  div.setAttribute("class", "dropdown");

  return div;
};

export default createSelect;