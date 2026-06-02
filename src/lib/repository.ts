import {
  type Favourite,
  type PersistedState,
  persistedStateSchema,
  type Settings,
} from '@/types/domain';

/*
 * The persistence seam. Only favourites + settings are stored (a keepsake, not a
 * metric). Components and the store never touch storage directly. Saved data is
 * parsed with Zod, so a corrupt, partial, or out-of-date shape safely falls back
 * to sensible defaults instead of crashing.
 */
const STORAGE_KEY = 'play-v1';

export function createDefaultState(): PersistedState {
  return {
    version: 1,
    settings: { theme: 'day', accent: '#5b9e74', showWhy: true, matchExact: false },
    favs: [],
  };
}

export interface Repository {
  getState(): PersistedState;
  saveState(state: PersistedState): void;
  setSettings(patch: Partial<Settings>): PersistedState;
  setFavs(favs: Favourite[]): PersistedState;
  clear(): void;
}

export function createLocalStorageRepository(storage: Storage = localStorage): Repository {
  function read(): PersistedState {
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) {
        return createDefaultState();
      }
      const parsed = persistedStateSchema.safeParse(JSON.parse(raw));
      return parsed.success ? parsed.data : createDefaultState();
    } catch {
      return createDefaultState();
    }
  }

  function saveState(state: PersistedState): void {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage can be unavailable (private mode, quota); the app still works.
    }
  }

  function setSettings(patch: Partial<Settings>): PersistedState {
    const current = read();
    const next: PersistedState = { ...current, settings: { ...current.settings, ...patch } };
    saveState(next);
    return next;
  }

  function setFavs(favs: Favourite[]): PersistedState {
    const current = read();
    const next: PersistedState = { ...current, favs };
    saveState(next);
    return next;
  }

  function clear(): void {
    try {
      storage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
  }

  return { getState: read, saveState, setSettings, setFavs, clear };
}

export const repository: Repository = createLocalStorageRepository();
