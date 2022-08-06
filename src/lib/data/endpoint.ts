import { API_URL } from "./config";

export default class Endpoint {
  constructor(
    protected name: string,
    protected version: string,
    protected type: string,
    protected token: string
  ) {}

  protected buildQueryURL(q: string) {
    return `${API_URL}/${this.version}/pipes/${this.name}.${this.type}?q=${q}`;
  }

  protected async fetch(url: string) {
    return await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.token}`,
        "Content-Type": "application/json",
      }
    })
    .then((r) => {
      if (this.type === "json") {
        return r.json();
      } else if (this.type === "csv" || this.type === "ndjson" || this.type === "parquet") {
        return r.text();
      } else {
        throw new Error("Unknown query format");
      }
    })
    .then(r => r)
    .catch(error => console.log(error));
  }

  query(q: string): Promise<unknown> {
    const queryURL = this.buildQueryURL(q);
    return this.fetch(queryURL);
  }
}