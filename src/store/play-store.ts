import { create } from 'zustand';
import { repository } from '@/lib/repository';
import type { Accent, Favourite, Idea, Settings, Theme } from '@/types/domain';

interface PlayState {
  settings: Settings;
  favs: Favourite[];
  isFavourite: (text: string) => boolean;
  /** Add the idea to favourites if not already there. */
  addFavourite: (idea: Idea) => void;
  removeFavourite: (text: string) => void;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
  setShowWhy: (on: boolean) => void;
  setMatchExact: (on: boolean) => void;
}

const initial = repository.getState();

export const usePlayStore = create<PlayState>((set, get) => {
  function patchSettings(patch: Partial<Settings>): void {
    set({ settings: repository.setSettings(patch).settings });
  }
  function commitFavs(favs: Favourite[]): void {
    set({ favs: repository.setFavs(favs).favs });
  }

  return {
    settings: initial.settings,
    favs: initial.favs,

    isFavourite: (text) => get().favs.some((f) => f.text === text),

    addFavourite: (idea) => {
      if (get().favs.some((f) => f.text === idea.text)) {
        return;
      }
      commitFavs([...get().favs, { text: idea.text, need: idea.need, mins: idea.mins }]);
    },
    removeFavourite: (text) => commitFavs(get().favs.filter((f) => f.text !== text)),

    setTheme: (theme) => patchSettings({ theme }),
    setAccent: (accent) => patchSettings({ accent }),
    setShowWhy: (showWhy) => patchSettings({ showWhy }),
    setMatchExact: (matchExact) => patchSettings({ matchExact }),
  };
});
