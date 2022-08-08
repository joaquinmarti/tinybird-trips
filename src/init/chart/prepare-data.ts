import type ChartData from "../../widgets/chart/types/chart-data";
import type StateType from "../../widgets/chart/types/state";;
import type { QueryResponseType } from "./config";

// Transforms the raw data into the format the chart widget expects
const prepareData = (
  data: QueryResponseType[],
  bars: StateType["range"],
  line: StateType["aggregated"],
  scales: ChartData["scales"],
  literals: ChartData["literals"]
): ChartData => {
  return {
    bars: {
      metric: bars,
      values: data.map(item => item["trips"]),
      time: data.map(item => item["time"])
    },
    line: {
      metric: line,
      values: data.map(item => item[line])
    },
    scales,
    literals,
  }
};

export default prepareData;