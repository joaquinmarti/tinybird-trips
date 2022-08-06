export default interface PersistenceService {
  get: () => {} | null;
  set: (name: string, value: string) => void;
}