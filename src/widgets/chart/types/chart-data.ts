type ChartData = {
  bars: {
    metric: string;
    values: number[];
  };
  line: {
    metric: string;
    values: number[];
  }
};

export default ChartData;