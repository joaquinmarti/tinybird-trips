import getMax from "./helpers/get-max";
import createSVGElement from "./helpers/create-svg-element";
import createSelect from "./helpers/create-select";
import styles from "./styles.css";
import type ChartDataType from "./types/chart-data";
import type StateType from "./types/state";

export default class Chart extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(this.buildStyle());
    shadow.appendChild(this.buildFilters());
  }

  set data(data: ChartDataType) {
    this.shadowRoot.querySelector("svg")?.remove();
    this.shadowRoot.appendChild(this.buildSvg(data))
  }

  /* Styles */
  buildStyle(): HTMLStyleElement {
    const style = document.createElement("style");

    style.innerHTML = styles;

    return style;
  }

  /* Filters rendering functions */

  buildFilters(): HTMLDivElement {
    const div = document.createElement("div");

    div.appendChild(this.buildRangeSelect());
    div.appendChild(this.buildAggregatedSelect());

    div.setAttribute("class", "filters");

    return div;
  }

  buildRangeSelect(): HTMLDivElement {
    const selectOptions: { value: StateType["range"], label: string }[] = [
      {
        value: "day_of_the_week",
        label: "Day of the week"
      },
      {
        value: "hourly",
        label: "Hourly"
      }
    ];

    return createSelect("range", "Number of trips by time range", selectOptions);
  }

  buildAggregatedSelect(): HTMLDivElement {
    const selectOptions: { value: StateType["aggregated"], label: string }[] = [
      {
        value: "fare",
        label: "Total fare"
      },
      {
        value: "average_fare",
        label: "Average fare"
      },
      {
        value: "average_distance",
        label: "Average distance"
      }
    ];

    return createSelect("aggregated", "Select aggregated data", selectOptions);
  }

  /* SVG rendering functions */

  buildSvg({ bars, line }: ChartDataType): SVGSVGElement {
    const svg = createSVGElement("svg") as SVGSVGElement;
    const g = createSVGElement("g") as SVGGElement;

    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const maxBars = getMax(bars.values);
    const maxLine = getMax(line.values);

    // Build guides
    this.buildGuides().forEach((line) => svg.appendChild(line));

    // Build bars (rect SVG elements inside a group)
    this.buildBars(bars.values, maxBars).forEach((rect) => g.appendChild(rect));
    svg.appendChild(g);

    // Build line
    svg.appendChild(this.buildLine(line.values, maxLine));

    return svg;
  }

  buildBars(values: ChartDataType["bars"]["values"], maxBars: number): SVGRectElement[] {
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

  buildLine(values: ChartDataType["line"]["values"], max: number): SVGPolylineElement {
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

  buildGuides(): SVGLineElement[] {
    const lines0 = createSVGElement("line") as SVGLineElement;
    const lines25 = createSVGElement("line") as SVGLineElement;
    const lines50 = createSVGElement("line") as SVGLineElement;
    const lines75 = createSVGElement("line") as SVGLineElement;
    const lines100 = createSVGElement("line") as SVGLineElement;

    lines0.setAttribute("x1", "0");
    lines0.setAttribute("y1", "100");
    lines0.setAttribute("x2", "100");
    lines0.setAttribute("y2", "100");

    lines25.setAttribute("x1", "0");
    lines25.setAttribute("y1", "75");
    lines25.setAttribute("x2", "100");
    lines25.setAttribute("y2", "75");

    lines50.setAttribute("x1", "0");
    lines50.setAttribute("y1", "50");
    lines50.setAttribute("x2", "100");
    lines50.setAttribute("y2", "50");

    lines75.setAttribute("x1", "0");
    lines75.setAttribute("y1", "25");
    lines75.setAttribute("x2", "100");
    lines75.setAttribute("y2", "25");

    lines100.setAttribute("x1", "0");
    lines100.setAttribute("y1", "0");
    lines100.setAttribute("x2", "100");
    lines100.setAttribute("y2", "0");

    return [
      lines0,
      lines25,
      lines50,
      lines75,
      lines100,
    ];
    // <line x1="0" y1="80" x2="100" y2="20" stroke="black" />
  }
}