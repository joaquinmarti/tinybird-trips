import createSVGElement from "./helpers/create-svg-element";
import createSelect from "./helpers/create-select";
import round from "./helpers/round";
import styles from "./styles.css";
import type ChartDataType from "./types/chart-data";
import type StateType from "./types/state";

export default class ChartElement extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(this.buildStyle());
  }

  set data(data: ChartDataType) {
    const filters = this.shadowRoot.querySelector(".filters");

    // Load the filters the first time the component receives the data property
    // needed to build them, and update their values
    if (!filters) {
      this.shadowRoot.appendChild(this.buildFilters(data.literals));
      this.updateFilters(data.bars.metric, data.line.metric);
    }

    this.shadowRoot.querySelector(".chart")?.remove();
    this.shadowRoot.appendChild(this.buildChart(data));
  }

  /* Styles */
  buildStyle(): HTMLStyleElement {
    const style = document.createElement("style");

    style.innerHTML = styles;

    return style;
  }

  /* Filters rendering functions */

  buildFilters(literals: ChartDataType["literals"]): HTMLDivElement {
    const div = document.createElement("div");

    div.appendChild(this.buildRangeSelect(literals));
    div.appendChild(this.buildAggregatedSelect(literals));

    div.setAttribute("class", "filters");

    return div;
  }

  buildRangeSelect(literals: ChartDataType["literals"]): HTMLDivElement {
    const selectOptions: { value: StateType["range"], label: string }[] = [
      {
        value: "day_of_the_week",
        label: literals.day_of_the_week
      },
      {
        value: "hourly",
        label: literals.hourly
      }
    ];

    return createSelect("range", literals.by_time_range, selectOptions);
  }

  buildAggregatedSelect(literals: ChartDataType["literals"]): HTMLDivElement {
    const selectOptions: { value: StateType["aggregated"], label: string }[] = [
      {
        value: "fare",
        label: literals.fare
      },
      {
        value: "average_fare",
        label: literals.average_fare
      },
      {
        value: "average_distance",
        label: literals.average_distance
      }
    ];

    return createSelect("aggregated", literals.select_aggregated, selectOptions);
  }

  updateFilters(barsMetric: string, lineMetric: string) {
    const filters = this.shadowRoot.querySelector(".filters");
    const rangeSelect = filters.querySelector("select[name=range]") as HTMLSelectElement;
    const aggregatedSelect = filters.querySelector("select[name=aggregated]") as HTMLSelectElement;

    rangeSelect.value = barsMetric;
    aggregatedSelect.value = lineMetric;
  }

  /* SVG rendering functions */

  buildChart({ bars, line, scales, literals }: ChartDataType): HTMLDivElement {
    const div = document.createElement("div");
    const svg = createSVGElement("svg") as SVGSVGElement;
    const g = createSVGElement("g") as SVGGElement;

    div.setAttribute("class", "chart");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const maxBars = round(Math.max(...bars.values), scales.trips);
    const maxLine = round(Math.max(...line.values), scales[line.metric]);

    // Build guides
    this.buildGuides().forEach((line) => svg.appendChild(line));

    // Build bars (rect SVG elements inside a group)
    this.buildBars(bars.values, maxBars).forEach((rect) => g.appendChild(rect));
    svg.appendChild(g);

    // Build line
    svg.appendChild(this.buildLine(line.values, maxLine));

    //
    div.appendChild(svg);
    div.appendChild(this.buildHorizontalAxis(bars, literals[bars.metric] || bars.metric));
    div.appendChild(this.buildVerticalAxis(maxBars, "bars-axis", literals.axis_trips));
    div.appendChild(this.buildVerticalAxis(maxLine, "line-axis", literals[line.metric] || line.metric, literals["unit_" + line.metric]));

    return div;
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
      const y = 100 - (100 * item / max);

      return `${x.toString()} ${y.toString()}`;
    }).join(" ");

    polyline.setAttribute("points", points);

    return polyline;
  }

  buildGuides(): SVGLineElement[] {
    return [0, 25, 50, 75, 100].map((y) => {
      const line = createSVGElement("line") as SVGLineElement;
      line.setAttribute("x1", "0");
      line.setAttribute("y1", y.toString());
      line.setAttribute("x2", "100");
      line.setAttribute("y2", y.toString());

      return line;
    });
  }

  /* Chart axis */

  buildHorizontalAxis(bars: ChartDataType["bars"], metric: string): HTMLDivElement {
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.setAttribute("class", "axis");
    span.setAttribute("class", "label");

    bars.time.forEach((item: number) => {
      const span = document.createElement("span");
      span.innerHTML = item.toString();
      div.appendChild(span);
    });

    //
    span.innerHTML = metric;
    div.appendChild(span);

    return div;
  }

  buildVerticalAxis(max: number, className: string, title: string, unit: string = ""): HTMLDivElement {
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.setAttribute("class", className);
    span.setAttribute("class", "label");

    // Numbers from 0 to max by 25% intervals
    for (let i = 0; i < 5; i += 1) {
      const span = document.createElement("span");
      span.innerHTML = `${(max * i / 4).toLocaleString()} ${unit}`;
      div.appendChild(span);
    }

    span.innerHTML = title;
    div.appendChild(span);

    return div;
  }
}