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

  buildStyle(): HTMLStyleElement {
    const style = document.createElement("style");

    style.innerHTML = styles;

    return style;
  }

  buildSvg({ bars, line }: ChartData): SVGSVGElement {
    const svg = createSVGElement("svg") as SVGSVGElement;
    const g = createSVGElement("g") as SVGGElement;

    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const maxBars = getMax(bars.values);
    const maxLine = getMax(line.values);

    // Build bars (rect SVG elements inside a group)
    this.buildBars(bars.values, maxBars).forEach((rect) => g.appendChild(rect));
    svg.appendChild(g);

    // Build line
    svg.appendChild(this.buildLine(line.values, maxLine));

    return svg;
  }

  buildBars(values: ChartData["bars"]["values"], maxBars: number): SVGRectElement[] {
    return values.map((item: number, index: number) => {
      return this.buildBar(
        100 / values.length,
        100 * item / maxBars,
        index,
      );
    });
  }

  buildBar(width: number, height: number, index: number): SVGRectElement {
    const rect = createSVGElement("rect") as SVGRectElement;

    rect.setAttribute("width", `${(width - 3).toString()}%`);
    rect.setAttribute("height", `${height.toString()}%`);
    rect.setAttribute("x", `${(index * width + 1.5).toString()}%`);
    rect.setAttribute("y", `${(100 - height).toString()}%`);

    return rect;
  }

  buildLine(values: ChartData["line"]["values"], max: number): SVGPolylineElement {
    const polyline = createSVGElement("polyline") as SVGPolylineElement;
    const points = values.map((item: number, index: number) => {
      const percentage = 100 / values.length;
      const x = (percentage * index) + (percentage / 2);
      const y = 100 - (50 * item / max);

      return `${x.toString()} ${y.toString()}`;
    }).join(" ");

    polyline.setAttribute("points", points);

    return polyline;
  }
}