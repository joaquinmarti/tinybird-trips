import PersistenceServive from "./common/persistence-service-interface";
import type StateType from "../../components/chart/types/state";

export default class UrlPersistence implements PersistenceServive {
  #params: URLSearchParams;

  constructor() {
    this.#params = new URLSearchParams(window.location.search);
  }

  get(): StateType {
    return {
      range: this.#params.get("range") as StateType["range"],
      aggregated: this.#params.get("aggregated") as StateType["aggregated"],
    };
  }

  set(name: string, value: string) {
    this.#params.set(name, value);
    window.history.replaceState({}, '', `${window.location.pathname}?${this.#params}`);
  }
}