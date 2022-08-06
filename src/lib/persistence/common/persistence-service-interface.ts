export default interface PersistenceService {
  get: () => {} | null;
  set: (data: {}) => void;
}