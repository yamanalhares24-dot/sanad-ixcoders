function checkIsBrowser(): boolean {
  return typeof window !== "undefined";
}

const defaultGetStorage = (): Storage | null =>
  checkIsBrowser() ? localStorage : null;

interface DataStorageInterface<T = unknown> {
  set: (data: T) => boolean | void;
  get: () => T | undefined;
  remove: () => boolean | void;
}

export const dataStorage = <T = unknown>(
  key: string,
  getStorage: () => Storage | null = defaultGetStorage
): DataStorageInterface<T> => {
  const storage = getStorage();
  return {
    set: (data: T) => {
      return (
        typeof window !== "undefined" &&
        storage?.setItem(key, JSON.stringify(data))
      );
    },
    get: () => {
      if (typeof window === "undefined") return undefined;
      const json = storage?.getItem(key);

      if (!json) return undefined;

      try {
        return JSON.parse(json) as T;
      } catch {
        return json as T;
      }
    },
    remove: () => {
      return typeof window !== "undefined" && storage?.removeItem(key);
    },
  };
};

export const dataSessionStorage = <T = unknown>(
  key: string
): DataStorageInterface<T> =>
  dataStorage<T>(key, () => (checkIsBrowser() ? sessionStorage : null));
