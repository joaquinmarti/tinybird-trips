type ResponseType = {
  data: unknown[];
  meta: unknown[];
  rows: number;
  statistics: {
    [key: string]: number;
  }
}

export default ResponseType;