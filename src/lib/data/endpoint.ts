import { API_URL } from "./config";
import DataCache from "./data-cache";
import ResponseType from "../types/response";

export default class Endpoint {
  protected cache;

  constructor(
    protected name: string,
    protected version: string,
    protected type: string,
    protected token: string,
    protected enableCache: boolean,
  ) {
    if (enableCache) {
      this.cache = new DataCache<ResponseType>();
    }
  }

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
    .then(async (r) => {
      if (this.type === "json") {
        const json = await r.json();

        if (json.error) {
          throw new Error(json.error);
        }

        return json;
      } else if (this.type === "csv" || this.type === "ndjson" || this.type === "parquet") {
        return r.text();
      } else {
        throw new Error("Unknown query format");
      }
    })
    .then(r => r)
    .catch(error => console.log(error));
  }

  async query(q: string): Promise<ResponseType> {
    // If the data we need is alreay downloaded and cache we can use it
    // directly. Otherwise, we can call the endpoint and cache it for later.
    if (this.cache && this.cache.has(q)) {
      return this.cache.get(q);
    } else {
      const queryURL = this.buildQueryURL(q);
      const result = await this.fetch(queryURL);

      // Save result in cache if it's enabled
      if (this.cache) {
        this.cache.set(q, result);
      }
      return result;
    }
  }
}