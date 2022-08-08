import type StateType from "../../widgets/chart/types/state";

// Hardcoded token, this shouldn't be here in a production ready code
export const token = "p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c";

export const queries = {
  day_of_the_week: "SELECT count() as trips, toDayOfWeek(tpep_pickup_datetime) as time, SUM(total_amount) as fare, AVG(total_amount) as average_fare, AVG(trip_distance) as average_distance FROM _ GROUP BY toDayOfWeek(tpep_pickup_datetime)",
  hourly: "SELECT count() as trips, toHour(tpep_pickup_datetime) as time, SUM(total_amount) as fare, AVG(total_amount) as average_fare, AVG(trip_distance) as average_distance FROM _ GROUP BY toHour(tpep_pickup_datetime)",
};

export const pipeName = "yellow_tripdata_2017_pipe";

export const defaultState: StateType = {
  range: "day_of_the_week",
  aggregated: "fare",
};

export const widgetTagName = "tbw-chart";

export const roundScales = {
  trips: 100000,
  fare: 10000000,
  average_distance: 0.5,
  average_fare: 5,
};

export const literals = {
  by_time_range: "Number of trips by time range",
  select_aggregated: "Select aggregated data",
  day_of_the_week: "By day of the week",
  hourly: "By hour",
  fare: "Total fare",
  average_fare: "Average fare",
  average_distance: "Average distance",
  axis_trips: "Trips",
  unit_fare: "$",
  unit_average_fare: "$",
  unit_average_distance: "miles",
};

export type QueryResponseType = {
  average_distance: number;
  average_fare: number;
  fare: number;
  time: number;
  trips: number;
};