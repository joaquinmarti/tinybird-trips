type ChartDataType = {
  bars: {
    metric: string;
    values: number[];
    time: number[];
  };
  line: {
    metric: string;
    values: number[];
  },
  scales: {
    [k: string]: number
  };
  literals: {
    [k: string]: string
  };
};

export default ChartDataType;