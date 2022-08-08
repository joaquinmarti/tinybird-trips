import { UrlPersistence } from "../../lib";
import type ChartData from "../../widgets/chart/types/chart-data";
import { queries, defaultState, widgetId, roundScales, literals } from "./config";
import prepareData from "./prepare-data";
import endpoint from "./endpoint";
import type { ResponseType } from "../../lib";
import type { QueryResponseType } from "./config";
import type StateType from "../../widgets/chart/types/state";

// Start the persistence layer, for our case is the URL.
// If we had more widgets in the same page we'd need to add a prefix to the props
// related to each widget or use another persistence method
const persistence = new UrlPersistence<StateType>();

// Reference to the widget
const widget = document.querySelector(widgetId) as HTMLElement & { data: ChartData };

// A function to update the widget by setting its data attribute
// That will internally trigger a widget rerender
const updateWidget = (data: ChartData) => widget.data = data;

// Load chart function, calls the endpoint and rerenders the widget
// Internally, the endpoint query has a cache system so it does not call the API if it already has the results
const loadChart = async (): Promise<void> => {
  const { range, aggregated } = persistence.get();
  const result = await endpoint.query(queries[range || defaultState.range]) as ResponseType;
  const preparedData = prepareData(
    result.data as QueryResponseType[],
    range || defaultState.range,
    aggregated || defaultState.aggregated,
    roundScales,
    literals
  );

  updateWidget(preparedData);
};

// History change listener. When the query param changes, it triggers a chart reload.
// For this widget, the url behaves as a store (holds the single source of truth for dropdowns state)
// and the history API as an event bus, as it triggers the load when it changes.
window.onpopstate = () => loadChart();

// Capture the change event from the widget dropdowns.
// In this event handler we use the persistence layer to save the dropdown values
// The persistence layer is a URL query param manager that trigger a history change.
// Later on, the history listener will be triggered and that will upload the chart.
widget.addEventListener("chart-dropdown-change", (event: Event & { detail: any }) => {
  event.stopImmediatePropagation();

  const target = event.detail.sourceEvent.target as HTMLSelectElement;

  if (target.name === "range") {
    persistence.set("range", target.value);
  }

  if (target.name === "aggregated") {
    persistence.set("aggregated", target.value);
  }
});


// Initial load
loadChart();