import { UrlPersistence } from "../../lib";
import type ChartData from "../../widgets/chart/types/chart-data";
import { queries, defaultState, widgetTagName, roundScales, literals } from "./config";
import prepareData from "./prepare-data";
import endpoint from "./endpoint";
import type { ResponseType } from "../../lib";

// Start the persistence layer, for this case is the URL.
// If we had more widgets in the same page we'd need to add a prefix to the props
// related to each widget
const persistence = new UrlPersistence();

// Reference to the widget
const widget = document.querySelector(widgetTagName) as HTMLElement & { data: ChartData };

// Setting the data attribute of the widget will trigger a rerender
const updateWidget = (data: ChartData) => widget.data = data;

// Change event listener. It changes the url through the persistence layer.
// Later on, the history listener will be triggered and that will upload the chart.
widget.shadowRoot.addEventListener("change",(event: Event) => {
  const target = event.target as HTMLSelectElement;

  if (target.name === "range") {
    persistence.set("range", target.value);
  }

  if (target.name === "aggregated") {
    persistence.set("aggregated", target.value);
  }
});

// Load chart function, calls the endpoint and rerenders the widget
const loadChart = async (): Promise<void> => {
  const { range, aggregated } = persistence.get();
  const result = await endpoint.query(queries[range || defaultState.range]) as ResponseType;
  const preparedData = prepareData(
    result.data,
    range || defaultState.range,
    aggregated || defaultState.aggregated,
    roundScales,
    literals
  );

  updateWidget(preparedData);
};

// History listener. When it changes it triggers a chart reload.
// For this widget, the url behaves as a store (holds the single source of truth for dropdowns state)
// and the history API as an event bus, as it triggers the load when it changes.
window.onpopstate = () => loadChart();

// Initial load
loadChart();