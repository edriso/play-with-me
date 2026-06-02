import { describe, expect, it } from 'vitest';
import type { Idea } from '@/types/domain';
import { drawIdea, poolFor } from './pool';

function idea(id: string, energy: Idea['energy']): Idea {
  return { id, energy, text: `idea-${id}`, need: 'just you', mins: 5, why: 'because' };
}

const SAMPLE: Idea[] = [
  idea('e1', 'empty'),
  idea('e2', 'empty'),
  idea('s1', 'some'),
  idea('s2', 'some'),
  idea('g1', 'good'),
];

describe('poolFor', () => {
  it('empty returns only empty ideas', () => {
    expect(poolFor('empty', false, SAMPLE).map((i) => i.id)).toEqual(['e1', 'e2']);
  });

  it('good (non-exact) returns every tier', () => {
    expect(poolFor('good', false, SAMPLE)).toHaveLength(5);
  });

  it('exact returns only the chosen tier', () => {
    expect(poolFor('good', true, SAMPLE).map((i) => i.id)).toEqual(['g1']);
    expect(poolFor('some', true, SAMPLE).map((i) => i.id)).toEqual(['s1', 's2']);
  });
});

describe('drawIdea', () => {
  it('returns null for an empty pool', () => {
    expect(drawIdea('good', [], false, () => 0, [])).toBeNull();
  });

  it('never returns an avoided idea while fresh ones remain', () => {
    // random() = 0 → picks the first candidate; with e1 avoided it must be e2.
    const drawn = drawIdea('empty', ['idea-e1'], false, () => 0, SAMPLE);
    expect(drawn?.id).toBe('e2');
  });

  it('falls back to the full pool once everything has been seen', () => {
    const allSeen = ['idea-e1', 'idea-e2'];
    const drawn = drawIdea('empty', allSeen, false, () => 0, SAMPLE);
    expect(drawn?.id).toBe('e1'); // wraps back to the full pool
  });

  it('handles a single-item pool', () => {
    const drawn = drawIdea('good', ['idea-g1'], true, () => 0.99, SAMPLE);
    expect(drawn?.id).toBe('g1');
  });
});
