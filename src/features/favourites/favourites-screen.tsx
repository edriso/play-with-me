import { Icon } from '@/components/icon';
import type { Favourite } from '@/types/domain';

interface FavouritesScreenProps {
  favs: Favourite[];
  onRemove: (text: string) => void;
}

export function FavouritesScreen({ favs, onRemove }: FavouritesScreenProps) {
  return (
    <div className="pl-favs pl-rise">
      <h2 className="pl-favs-title">Saved ideas</h2>
      {favs.length === 0 ? (
        <p className="pl-favs-empty">
          Tap the heart on an idea you love and it&rsquo;ll wait for you here.
        </p>
      ) : (
        <div className="pl-favs-list">
          {favs
            .slice()
            .reverse()
            .map((fav) => (
              <div key={fav.text} className="pl-fav">
                <p className="pl-fav-text">{fav.text}</p>
                <div className="pl-fav-meta">
                  <span>{fav.need}</span>
                  <span>~{fav.mins} min</span>
                </div>
                <button
                  className="pl-fav-x pl-tap"
                  type="button"
                  onClick={() => onRemove(fav.text)}
                  aria-label={`Remove: ${fav.text}`}
                >
                  <Icon name="x" size={15} />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
