import { useState } from 'react';
import { Icon } from '@/components/icon';
import { SettingsOverlay } from '@/components/settings-overlay';
import { useApplyTheme } from '@/hooks/use-apply-theme';
import { COPY, NOTES } from '@/lib/ideas';
import { drawIdea } from '@/lib/pool';
import { PickScreen } from '@/features/pick/pick-screen';
import { IdeaScreen } from '@/features/idea/idea-screen';
import { FavouritesScreen } from '@/features/favourites/favourites-screen';
import { usePlayStore } from '@/store/play-store';
import type { Energy, Idea, Phase } from '@/types/domain';

export function App() {
  useApplyTheme();
  const settings = usePlayStore((state) => state.settings);
  const favs = usePlayStore((state) => state.favs);
  const isFavourite = usePlayStore((state) => state.isFavourite);
  const addFavourite = usePlayStore((state) => state.addFavourite);
  const removeFavourite = usePlayStore((state) => state.removeFavourite);

  const [phase, setPhase] = useState<Phase>('pick');
  const [level, setLevel] = useState<Energy | null>(null);
  const [idea, setIdea] = useState<Idea | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [bump, setBump] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [note] = useState(() => NOTES[Math.floor(Math.random() * NOTES.length)]);

  function choose(chosen: Energy) {
    const first = drawIdea(chosen, [], settings.matchExact);
    if (!first) {
      return;
    }
    setLevel(chosen);
    setIdea(first);
    setSeen([first.text]);
    setBump((b) => b + 1);
    setPhase('idea');
  }

  function another() {
    if (!level) {
      return;
    }
    const next = drawIdea(level, seen, settings.matchExact);
    if (!next) {
      return;
    }
    setIdea(next);
    setSeen((s) => [...s.slice(-6), next.text]);
    setBump((b) => b + 1);
  }

  function toggleFav() {
    if (!idea) {
      return;
    }
    if (isFavourite(idea.text)) {
      removeFavourite(idea.text);
    } else {
      addFavourite(idea);
    }
  }

  return (
    <div className="pl-app">
      <div className="pl-stage">
        <div className="pl-head">
          {phase === 'pick' ? (
            <button
              className="pl-icon pl-tap"
              type="button"
              onClick={() => setSettingsOpen(true)}
              aria-label="Settings"
            >
              <Icon name="sparkles" size={19} />
            </button>
          ) : (
            <button
              className="pl-icon pl-tap"
              type="button"
              onClick={() => setPhase('pick')}
              aria-label="Back"
            >
              <Icon name="back" size={20} />
            </button>
          )}
          <div className="pl-wordmark">{COPY.name}</div>
          <button
            className="pl-icon pl-tap"
            type="button"
            onClick={() => setPhase(phase === 'favs' ? 'pick' : 'favs')}
            aria-label="Favourites"
          >
            <Icon
              name={favs.length > 0 ? 'heartFill' : 'heart'}
              size={19}
              style={{ color: favs.length > 0 ? 'var(--accent)' : 'currentColor' }}
            />
          </button>
        </div>

        {phase === 'pick' && <PickScreen note={note} onChoose={choose} />}

        {phase === 'idea' && idea && (
          <IdeaScreen
            idea={idea}
            isEmpty={level === 'empty'}
            showWhy={settings.showWhy}
            isFav={isFavourite(idea.text)}
            bump={bump}
            onToggleFav={toggleFav}
            onAnother={another}
          />
        )}

        {phase === 'favs' && <FavouritesScreen favs={favs} onRemove={removeFavourite} />}
      </div>

      {settingsOpen && <SettingsOverlay onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}
