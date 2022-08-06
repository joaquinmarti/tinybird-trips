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
}