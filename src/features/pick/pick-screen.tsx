import { Icon } from '@/components/icon';
import { COPY, LEVELS } from '@/lib/ideas';
import type { Energy } from '@/types/domain';

interface PickScreenProps {
  note: string;
  onChoose: (level: Energy) => void;
}

export function PickScreen({ note, onChoose }: PickScreenProps) {
  return (
    <div className="pl-pick pl-rise">
      <h1 className="pl-ask">{COPY.ask}</h1>
      <p className="pl-ask-sub">{COPY.askSub}</p>
      <div className="pl-levels">
        {LEVELS.map((level) => (
          <button
            key={level.id}
            type="button"
            className="pl-level pl-tap"
            onClick={() => onChoose(level.id)}
            style={{ '--lc': level.color } as React.CSSProperties}
          >
            <span className="pl-level-ic">
              <Icon name={level.icon} size={26} />
            </span>
            <span className="pl-level-txt">
              <span className="pl-level-label">{level.label}</span>
              <span className="pl-level-sub">{level.sub}</span>
            </span>
          </button>
        ))}
      </div>
      <p className="pl-note">{note}</p>
    </div>
  );
}
