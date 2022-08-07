import type ChartData from "../../widgets/chart/types/chart-data";
import type StateType from "../../widgets/chart/types/state";
import type { ResponseType } from "../../lib";

// Transforms the raw data into the format the chart widget expects
const prepareData = (
  trips: ResponseType["data"],
  bars: StateType["range"],
  line: StateType["aggregated"],
  scales: ChartData["scales"],
  literals: ChartData["literals"]
): ChartData => {
  return {
    bars: {
      metric: bars,
      values: trips.map(item => item["trips"]),
      time: trips.map(item => item["time"])
    },
    line: {
      metric: line,
      values: trips.map(item => item[line])
    },
    scales,
    literals,
  }
};

export default prepareData;