import { UrlPersistence, EndpointsManager } from "../lib";
import type ChartData from "../components/chart/types/chart-data";
import type { ResponseType } from "../lib";

// Hardcoded token, this shouldn't be here in a prod ready code
const token = "p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c";

// Queries
const queries = {
  day_of_the_week: "SELECT count() as trips, toDayOfWeek(tpep_pickup_datetime) as day, SUM(total_amount) as fare, AVG(total_amount) as average_fare, AVG(trip_distance) as average_distance FROM _ GROUP BY toDayOfWeek(tpep_pickup_datetime)",
  hourly: "SELECT count() as trips, toHour(tpep_pickup_datetime) as hour, SUM(total_amount) as fare, AVG(total_amount) as average_fare, AVG(trip_distance) as average_distance FROM _ GROUP BY toHour(tpep_pickup_datetime)",
};

// Create endpoint, query data and send it to the widget
const em = new EndpointsManager(token);
const endpoint = em.createEndpoint("yellow_tripdata_2017_pipe");

// Start the widget and the persistence layer
const widget = document.querySelector("tbw-chart") as HTMLElement & { data: ChartData };
// const persistence = new UrlPersistence("chart-1");

// Variable to hold the data for the chart, it works as a "store"
let rawData: ResponseType["data"];

// Helper function to prepare data for the chart
const prepareData = (trips: any[], line: string): ChartData => {
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
  console.log("range change");
  console.log(event);
  console.log(target.name);
  console.log(target.value);


  if (target.name === "range") {
    queryAndUpdate(target.value as "day_of_the_week" | "hourly");
  }

  if (target.name === "aggregated") {
    updateWidget(prepareData(rawData, target.value));
  }
});

// Query the data and send it to the widget
const queryAndUpdate = (range: "day_of_the_week" | "hourly"): void => {
  const result = endpoint.query(queries[range]);

  // Load the data into the widget
  result.then((response: ResponseType) => {
    rawData = response.data;
    updateWidget(prepareData(rawData, "average_distance"));
  });
};

// Initial load
queryAndUpdate("day_of_the_week");
