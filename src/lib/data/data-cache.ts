export default class DataCach<T> {
  #cache: Map<string, T>;

  constructor() {
    this.#cache = new Map();
  }

  set(key: string, value: any): void {
    this.#cache.set(key, value);
  }

  get(key: string): T {
    return this.#cache.get(key);
  }

  has(key: string): boolean {
    return this.#cache.has(key);
  }
}