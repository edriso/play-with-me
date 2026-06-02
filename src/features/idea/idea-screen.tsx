import { useState } from 'react';
import { Icon } from '@/components/icon';
import { useInterval } from '@/hooks/use-interval';
import { COPY } from '@/lib/ideas';
import type { Idea } from '@/types/domain';

interface IdeaScreenProps {
  idea: Idea;
  isEmpty: boolean;
  showWhy: boolean;
  isFav: boolean;
  /** Changes each time a new idea is drawn, so the card re-animates. */
  bump: number;
  onToggleFav: () => void;
  onAnother: () => void;
}

function clock(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
}

export function IdeaScreen({
  idea,
  isEmpty,
  showWhy,
  isFav,
  bump,
  onToggleFav,
  onAnother,
}: IdeaScreenProps) {
  const [timer, setTimer] = useState<number | null>(null);

  useInterval(
    () => setTimer((s) => (s !== null && s > 0 ? s - 1 : 0)),
    timer !== null && timer > 0 ? 1000 : null,
  );

  // A fresh idea resets any running timer.
  const [seenBump, setSeenBump] = useState(bump);
  if (seenBump !== bump) {
    setSeenBump(bump);
    if (timer !== null) {
      setTimer(null);
    }
  }

  return (
    <div className="pl-ideawrap">
      {isEmpty && <p className="pl-reassure">{COPY.emptyReassure}</p>}
      <div className="pl-card pl-pop" key={bump}>
        <div className="pl-card-tags">
          <span className="pl-tag">
            <Icon name="box" size={14} /> {idea.need}
          </span>
          <span className="pl-tag">
            <Icon name="clock" size={14} /> ~{idea.mins} min
          </span>
        </div>
        <p className="pl-idea">{idea.text}</p>
        {showWhy && <p className="pl-why">{idea.why}</p>}

        {timer !== null && (
          <div className="pl-timer">
            <span className="pl-timer-time">{clock(timer)}</span>
            <button className="pl-timer-stop pl-tap" type="button" onClick={() => setTimer(null)}>
              stop
            </button>
          </div>
        )}
      </div>

      <div className="pl-actions">
        <button
          className="pl-act pl-act-fav pl-tap"
          type="button"
          onClick={onToggleFav}
          aria-label="Love it"
        >
          <Icon
            name={isFav ? 'heartFill' : 'heart'}
            size={20}
            style={{ color: isFav ? 'var(--accent)' : 'currentColor' }}
          />
        </button>
        <button className="pl-cta pl-tap" type="button" onClick={onAnother}>
          <Icon name="refresh" size={18} /> Another idea
        </button>
        {timer === null && (
          <button
            className="pl-act pl-tap"
            type="button"
            onClick={() => setTimer((idea.mins || 10) * 60)}
            aria-label="Start timer"
          >
            <Icon name="clock" size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
