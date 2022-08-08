import ChartElement from "./chart";

if (!customElements.get("tbw-chart")) {
  customElements.define("tbw-chart", ChartElement);
}