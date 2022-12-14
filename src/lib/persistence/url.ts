import PersistenceServive from "./common/persistence-service-interface";

// This class abstracts the URL query param management. It can set a new parameter or
// get the current ones. The query params in this case are used to persist a certain state

export default class UrlPersistence<T = {}> implements PersistenceServive {
  constructor() {}

  get(): T {
    const params = new URLSearchParams(window.location.search);

    const state: { [k: string]: string } = {};
    for (const item of params.entries()) {
      const [key, value]: [string, string] = item;
      state[key] = value;
    }

    return state as unknown as T;
  }

  set(name: string, value: string) {
    const params = new URLSearchParams(window.location.search);
    params.set(name, value);

    window.history.pushState({}, "", `${window.location.pathname}?${params}`);
    window.dispatchEvent(new Event("popstate"));
  }
}