import type ChartData from "../../widgets/chart/types/chart-data";
import type StateType from "../../widgets/chart/types/state";
import type { ResponseType } from "../../lib";

// Transforms the raw data into the format the chart widget expects
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

export default prepareData;