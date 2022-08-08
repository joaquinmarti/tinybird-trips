import ChartElement from "./chart-element";

if (!customElements.get("tbw-chart")) {
  customElements.define("tbw-chart", ChartElement);
}