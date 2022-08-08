// This interface describes how a persistence service has to be implemented

export default interface PersistenceService {
  get: () => {} | null;
  set: (name: string, value: string) => void;
}