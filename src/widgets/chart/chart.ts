import getMax from "./helpers/get-max";
import createSVGElement from "./helpers/create-svg-element";
import styles from "./styles.css";
import type ChartData from "./types/chart-data";

export default class Chart extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.appendChild(this.buildStyle());
  }

  set data(data: ChartData) {
    this.shadowRoot.appendChild(this.buildSvg(data))
  }

  buildStyle() {
    const style = document.createElement("style");

    style.innerHTML = styles;

    return style;
  }

  buildSvg({ bars, line }: ChartData) {
    const svg = createSVGElement("svg");
    const g = createSVGElement("g");

    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const maxBars = getMax(bars.values);
    const maxLine = getMax(line.values);

    bars.values.forEach((item: any, index: number) => {
      g.appendChild(this.buildBar(
        100 / bars.values.length,
        100 * item / maxBars,
        index,
      ))
    });

    svg.appendChild(g);
    svg.appendChild(this.buildLine(line.values, maxLine));

    return svg;
  }

  buildBar(width: number, height: number, index: number) {
    const rect = createSVGElement("rect");

    rect.setAttribute("width", `${(width - 3).toString()}%`);
    rect.setAttribute("height", `${height.toString()}%`);
    rect.setAttribute("x", `${(index * width + 1.5).toString()}%`);
    rect.setAttribute("y", `${(100 - height).toString()}%`);

    return rect;
  }

  buildLine(data: any[], max: number) {
    const polyline = createSVGElement("polyline");
    const points = data.map((item: any, index: number) => {
      const percentage = 100 / data.length;
      const x = (percentage * index) + (percentage / 2);
      const y = 100 - (50 * item / max);

      return `${x.toString()} ${y.toString()}`;
    }).join(" ");

    polyline.setAttribute("points", points);

    return polyline;
  }
}