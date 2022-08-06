type ResponseType = {
  data: any[];
  meta: any[];
  rows: number;
  statistics: {
    [key: string]: number;
  }
}

export default ResponseType;