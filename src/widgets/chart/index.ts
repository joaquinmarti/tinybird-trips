import Chart from "./chart";

if (!customElements.get("tbw-chart")) {
  customElements.define("tbw-chart", Chart);
}