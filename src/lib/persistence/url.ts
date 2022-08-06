import PersistenceServive from "./common/persistence-service-interface";
import type StateType from "../../components/chart/types/state";

export default class UrlPersistence implements PersistenceServive {
  constructor() {}

  get(): StateType {
    const params = new URLSearchParams(window.location.search);

    return {
      range: params.get("range") as StateType["range"],
      aggregated: params.get("aggregated") as StateType["aggregated"],
    };
  }

  set(name: string, value: string) {
    const params = new URLSearchParams(window.location.search);
    params.set(name, value);

    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
    window.dispatchEvent(new Event("popstate"));
  }
}