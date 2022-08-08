export default class DataCache<T = unknown[]> {
  #cache: Map<string, T>;

  constructor() {
    this.#cache = new Map();
  }

  set(key: string, value: T): void {
    this.#cache.set(key, value);
  }

  get(key: string): T {
    return this.#cache.get(key);
  }

  has(key: string): boolean {
    return this.#cache.has(key);
  }
}