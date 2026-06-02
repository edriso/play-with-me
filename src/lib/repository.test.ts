import { beforeEach, describe, expect, it } from 'vitest';
import { createLocalStorageRepository, type Repository } from './repository';

function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (key: string) => map.get(key) ?? null,
    key: (index: number) => Array.from(map.keys())[index] ?? null,
    removeItem: (key: string) => {
      map.delete(key);
    },
    setItem: (key: string, value: string) => {
      map.set(key, value);
    },
  } as Storage;
}

describe('localStorage repository', () => {
  let repo: Repository;
  let storage: Storage;

  beforeEach(() => {
    storage = memoryStorage();
    repo = createLocalStorageRepository(storage);
  });

  it('returns sensible defaults when nothing is stored', () => {
    const state = repo.getState();
    expect(state.version).toBe(1);
    expect(state.settings.theme).toBe('day');
    expect(state.settings.matchExact).toBe(false);
    expect(state.favs).toEqual([]);
  });

  it('falls back to defaults on corrupt JSON', () => {
    storage.setItem('play-v1', 'not json');
    expect(repo.getState().settings.accent).toBe('#5b9e74');
  });

  it('falls back to defaults on a wrong shape', () => {
    storage.setItem('play-v1', JSON.stringify({ version: 1, settings: {} }));
    expect(repo.getState().settings.showWhy).toBe(true);
  });

  it('round-trips settings and favourites', () => {
    repo.setSettings({ theme: 'night', matchExact: true });
    repo.setFavs([{ text: 'Sock puppets', need: '2 socks', mins: 10 }]);
    const after = repo.getState();
    expect(after.settings.theme).toBe('night');
    expect(after.settings.matchExact).toBe(true);
    expect(after.favs).toHaveLength(1);
    expect(after.favs[0].text).toBe('Sock puppets');
  });
});
