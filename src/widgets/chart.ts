import { UrlPersistence, EndpointsManager } from "../lib";
import type ChartData from "../components/chart/types/chart-data";
import type StateType from "../components/chart/types/state";
import type { ResponseType } from "../lib";

// Hardcoded token, this shouldn't be here in a production ready code
const token = "p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c";

// Queries
const queries = {
  day_of_the_week: "SELECT count() as trips, toDayOfWeek(tpep_pickup_datetime) as day, SUM(total_amount) as fare, AVG(total_amount) as average_fare, AVG(trip_distance) as average_distance FROM _ GROUP BY toDayOfWeek(tpep_pickup_datetime)",
  hourly: "SELECT count() as trips, toHour(tpep_pickup_datetime) as hour, SUM(total_amount) as fare, AVG(total_amount) as average_fare, AVG(trip_distance) as average_distance FROM _ GROUP BY toHour(tpep_pickup_datetime)",
};

// Initial state
const defaultState: StateType = {
  range: "day_of_the_week",
  aggregated: "average_distance",
};

// Create endpoint, query data and send it to the widget
const em = new EndpointsManager(token);
const endpoint = em.createEndpoint("yellow_tripdata_2017_pipe");

// Start the widget and the persistence layer
const widget = document.querySelector("tbw-chart") as HTMLElement & { data: ChartData };
const persistence = new UrlPersistence();

// Variable to hold the data for the chart, it works as a "store"
let rawData: ResponseType["data"];

// Helper function to prepare data for the chart
const prepareData = (trips: ResponseType["data"], line: StateType["aggregated"]): ChartData => {
  return {
    bars: {
      metric: "trips",
      values: trips.map(item => item["trips"])
    },
    line: {
      metric: line,
      values: trips.map(item => item[line])
    },
  }
};

// Send the data to the chart
const updateWidget = (data: ChartData): void => {
  widget.data = data;
}

// Events
widget.shadowRoot.addEventListener("change",(event: Event) => {
  const target = event.target as HTMLSelectElement;

  if (target.name === "range") {
    persistence.set("range", target.value);
  }

  if (target.name === "aggregated") {
    persistence.set("aggregated", target.value);
  }
});

// Load chart
const loadChart = (): void => {
  const { range, aggregated } = persistence.get();
  queryAndUpdate(
    range || defaultState.range,
    aggregated || defaultState.aggregated
  );
}

// History listener. In our case, the url behaves as a store and the history as a bus event
window.onpopstate = () => loadChart();

// Query the data and send it to the widget
const queryAndUpdate = async (range: StateType["range"], aggregated: StateType["aggregated"]): Promise<void> => {
  const result = await endpoint.query(queries[range]) as ResponseType;

  rawData = result.data;
  updateWidget(prepareData(rawData, aggregated));
};

// Initial load
loadChart();

