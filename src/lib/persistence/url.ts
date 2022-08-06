import PersistenceServive from "./common/persistence-service-interface";

export default class UrlPersistence implements PersistenceServive {
  constructor(private prefix: string) {
    console.log("Prepare UrlPersistence: ", prefix);
  }

  get() {
    const urlParams = new URLSearchParams(window.location.search);

    console.log(urlParams);

    return {}
  }

  set() {
    console.log("set url");

  }
}