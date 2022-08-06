import { UrlPersistence, EndpointsManager } from "../lib";
import type ChartData from "../components/chart/types/chart-data";
import type { ResponseType } from "../lib";

const token = "p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c";

const widget = document.querySelector("tbw-chart") as HTMLElement & { data: ChartData };
const persistence = new UrlPersistence("chart-1");

// Helper function to prepare data for the chart
const prepareData = (trips: any[], bars: string, line: string): ChartData => {
  return {
    bars: {
      metric: bars,
      values: trips.map(item => item[bars])
    },
    line: {
      metric: line,
      values: trips.map(item => item[line])
    },
  }
}

// Create endpoint, query data and send it to the widget
const em = new EndpointsManager(token);
const endpoint = em.createEndpoint("yellow_tripdata_2017_pipe");
const result = endpoint.query("SELECT count() as trips, toDayOfWeek(tpep_pickup_datetime) as day, SUM(total_amount) as fare, AVG(total_amount) as average_fare, AVG(trip_distance)  as average_distance FROM _ GROUP BY toDayOfWeek(tpep_pickup_datetime)");

// Load the data into the widget
result.then((response: ResponseType) => {
  widget.data = prepareData(response.data, "trips", "fare");
});







// Number of trips per distance
// const result = endpoint.query("SELECT COUNT() AS total, trip_distance FROM _ GROUP BY trip_distance ORDER BY trip_distance");

// Number of trips per day of the month
// const result = endpoint.query(`SELECT count(), toDate(tpep_pickup_datetime) as total FROM _ GROUP BY toDate(tpep_pickup_datetime)`);

// Number of trips per day of the week
// const result = endpoint.query(`SELECT count(), toDayOfWeek(tpep_pickup_datetime) as total FROM _ GROUP BY toDayOfWeek(tpep_pickup_datetime)`);

// Number of trips per day of the week
// const result = endpoint.query(`SELECT count() as trips, toDayOfWeek(tpep_pickup_datetime) as day, SUM(total_amount) as fare, AVG(total_amount) as average_fare, AVG(trip_distance)  as average_distance FROM _ GROUP BY toDayOfWeek(tpep_pickup_datetime)`);

// Number of trips per day of the month
// const result = endpoint.query(`SELECT count() as trips, toDayOfMonth(tpep_pickup_datetime) as day, SUM(total_amount) as fare, AVG(total_amount) as average_fare, AVG(trip_distance)  as average_distance FROM _ GROUP BY toDayOfMonth(tpep_pickup_datetime)`);



