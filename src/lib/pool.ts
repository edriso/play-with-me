import { ENERGY_ORDER, type Energy, type Idea } from '@/types/domain';
import { IDEAS } from './ideas';

/*
 * The energy-grading core, kept pure and tested. `poolFor` returns the ideas a
 * parent at a given level can do: by default that includes easier tiers too (a
 * higher-energy parent may still want a couch game), or exactly the chosen tier
 * when `exact` is set. `drawIdea` picks one at random while avoiding recently
 * seen ideas, falling back to the full pool once they have all been seen.
 */
export function poolFor(level: Energy, exact: boolean, ideas: Idea[] = IDEAS): Idea[] {
  const max = ENERGY_ORDER.indexOf(level);
  return ideas.filter((it) =>
    exact ? it.energy === level : ENERGY_ORDER.indexOf(it.energy) <= max,
  );
}

/**
 * Draw one idea for `level`, avoiding any whose text is in `avoid` while fresh
 * ideas remain. `random` is injectable for deterministic tests.
 */
export function drawIdea(
  level: Energy,
  avoid: string[],
  exact: boolean,
  random: () => number = Math.random,
  ideas: Idea[] = IDEAS,
): Idea | null {
  const pool = poolFor(level, exact, ideas);
  if (pool.length === 0) {
    return null;
  }
  const fresh = pool.filter((it) => !avoid.includes(it.text));
  const candidates = fresh.length > 0 ? fresh : pool;
  const index = Math.min(candidates.length - 1, Math.floor(random() * candidates.length));
  return candidates[index];
}
