/*
This loader contains code to config a specific widget. It could be a server
generated JS file loading the config needed depending on the widget ID.
*/

import { UrlPersistence, EndpointsManager } from "../lib";
import type ChartData from "../widgets/chart/types/chart-data";

const token = "p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c";

const widget = document.querySelector("tbw-chart") as HTMLElement & { data: ChartData };
const persistence = new UrlPersistence("chart-1");

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

// Fake data, replace with real data
const trips = [
  {
    "trips": 1369976,
    "day": 1,
    "fare": 21260719.972257555,
    "average_fare": 15.519045568869494,
    "average_distance": 2.9543315428654324
  },
  {
    "trips": 1542560,
    "day": 2,
    "fare": 23772274.747118175,
    "average_fare": 15.410923884398775,
    "average_distance": 2.7074858933247365
  },
  {
    "trips": 1257135,
    "day": 3,
    "fare": 19668498.954230566,
    "average_fare": 15.645494679752426,
    "average_distance": 2.772902965710188
  },
  {
    "trips": 1326441,
    "day": 4,
    "fare": 21634587.021895498,
    "average_fare": 16.31025203676266,
    "average_distance": 2.776444470270042
  },
  {
    "trips": 1390990,
    "day": 5,
    "fare": 21681510.728126407,
    "average_fare": 15.58710754795247,
    "average_distance": 2.7301408275223307
  },
  {
    "trips": 1345612,
    "day": 6,
    "fare": 19359078.08174455,
    "average_fare": 14.386820332863078,
    "average_distance": 2.640406602909126
  },
  {
    "trips": 1477410,
    "day": 7,
    "fare": 23389778.6136069,
    "average_fare": 15.831609785778422,
    "average_distance": 3.1001677257385483
  }
];
//

widget.data = prepareData(trips, "trips", "average_distance");






// Create endpoint, query data and send it to the widget
// const em = new EndpointsManager(token);
// const endpoint = em.createEndpoint("yellow_tripdata_2017_pipe");
// const result = endpoint.query("SELECT vendorid FROM _ WHERE toDate(tpep_pickup_datetime) = '2019-01-01'");

// Number of trips per distance
// const result = endpoint.query("SELECT COUNT() AS total, trip_distance FROM _ GROUP BY trip_distance ORDER BY trip_distance");

// Number of trips per day of the month
// const result = endpoint.query(`SELECT count(), toDate(tpep_pickup_datetime) as total FROM _ GROUP BY toDate(tpep_pickup_datetime)`);

// Number of trips per day of the week
// const result = endpoint.query(`SELECT count(), toDayOfWeek(tpep_pickup_datetime) as total FROM _ GROUP BY toDayOfWeek(tpep_pickup_datetime)`);

// Number of trips per day of the week
// const result = endpoint.query(`SELECT count() as trips, toDayOfWeek(tpep_pickup_datetime) as day, SUM(total_amount) as fare, AVG(total_amount) as average_fare, AVG(trip_distance)  as average_distance FROM _ GROUP BY toDayOfWeek(tpep_pickup_datetime)`);

// Number of trips per day of the week
// const result = endpoint.query(`https://api.tinybird.co/v0/pipes/yellow_tripdata_2017_pipe.json?q= SELECT count() as trips, toDayOfMonth(tpep_pickup_datetime) as day, SUM(total_amount) as fare, AVG(total_amount) as average_fare, AVG(trip_distance)  as average_distance FROM _ GROUP BY toDayOfMonth(tpep_pickup_datetime)`);

// setTimeout(() => {
//   console.log(result);
// }, 1000)


//widget.data = result;

