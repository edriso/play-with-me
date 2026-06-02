import { z } from 'zod';

/** Energy levels, ordered from least to most: empty < some < good. */
export const ENERGY_ORDER = ['empty', 'some', 'good'] as const;
export const energySchema = z.enum(ENERGY_ORDER);
export type Energy = z.infer<typeof energySchema>;

/** One play idea. `energy` is the minimum level at which it's doable. */
export interface Idea {
  id: string;
  text: string;
  need: string;
  mins: number;
  why: string;
  energy: Energy;
  /** Reserved for a future age filter; not used yet. */
  ageMin?: number;
  ageMax?: number;
}

/** A saved idea — a keepsake, not a metric. */
export const favouriteSchema = z.object({
  text: z.string(),
  need: z.string(),
  mins: z.number().int().nonnegative(),
});
export type Favourite = z.infer<typeof favouriteSchema>;

export const THEMES = ['day', 'night'] as const;
export const themeSchema = z.enum(THEMES);
export type Theme = z.infer<typeof themeSchema>;

/** Warm accent swatches. */
export const ACCENTS = ['#5b9e74', '#e08a5a', '#e0a83c', '#5f8fd0', '#b07cc8'] as const;
export const accentSchema = z.enum(ACCENTS);
export type Accent = z.infer<typeof accentSchema>;

export const settingsSchema = z.object({
  theme: themeSchema,
  accent: accentSchema,
  showWhy: z.boolean(),
  /** When true, only offer ideas at the exact chosen energy level. */
  matchExact: z.boolean(),
});
export type Settings = z.infer<typeof settingsSchema>;

export const persistedStateSchema = z.object({
  version: z.literal(1),
  settings: settingsSchema,
  favs: z.array(favouriteSchema),
});
export type PersistedState = z.infer<typeof persistedStateSchema>;

/** The one-page phase. */
export type Phase = 'pick' | 'idea' | 'favs';
