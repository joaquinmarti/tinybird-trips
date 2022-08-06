import type StateType from "../../widgets/chart/types/state";

// Hardcoded token, this shouldn't be here in a production ready code
export const token = "p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c";

export const queries = {
  day_of_the_week: "SELECT count() as trips, toDayOfWeek(tpep_pickup_datetime) as day, SUM(total_amount) as fare, AVG(total_amount) as average_fare, AVG(trip_distance) as average_distance FROM _ GROUP BY toDayOfWeek(tpep_pickup_datetime)",
  hourly: "SELECT count() as trips, toHour(tpep_pickup_datetime) as hour, SUM(total_amount) as fare, AVG(total_amount) as average_fare, AVG(trip_distance) as average_distance FROM _ GROUP BY toHour(tpep_pickup_datetime)",
};

export const pipeName = "yellow_tripdata_2017_pipe";

export const defaultState: StateType = {
  range: "day_of_the_week",
  aggregated: "average_distance",
};

export const widgetTagName = "tbw-chart";