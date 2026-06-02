import type { Energy, Idea } from '@/types/domain';

/*
 * Let's Play content, ported from the prototype (play-data.js). The spine is
 * ENERGY: each idea is graded by the minimum energy a parent needs, so saying
 * "yes" costs almost nothing. The "empty" tier is the soul — genuinely
 * near-zero-effort games you can play lying down. Content is tuned for
 * school-age kids (5–10); the model leaves room for a future age filter.
 */

export interface EnergyLevel {
  id: Energy;
  label: string;
  sub: string;
  icon: 'battery0' | 'battery1' | 'battery2';
  color: string;
}

export const LEVELS: EnergyLevel[] = [
  {
    id: 'empty',
    label: 'Running on empty',
    sub: 'I can barely move',
    icon: 'battery0',
    color: '#c98a6a',
  },
  {
    id: 'some',
    label: 'A little left',
    sub: 'I can sit and play',
    icon: 'battery1',
    color: '#d9a84c',
  },
  { id: 'good', label: "I'm good", sub: "Let's actually move", icon: 'battery2', color: '#5b9e74' },
];

function idea(
  id: string,
  energy: Energy,
  text: string,
  need: string,
  mins: number,
  why: string,
): Idea {
  return { id, energy, text, need, mins, why };
}

export const IDEAS: Idea[] = [
  // ---- EMPTY: zero standing up, parent can lie down ----
  idea(
    'e1',
    'empty',
    "Be the patient. Lie still and let them be the doctor who 'fixes' you.",
    'just you',
    10,
    'They get to be in charge, you get to lie down. Everyone wins.',
  ),
  idea(
    'e2',
    'empty',
    'Tell them a story about when they were a tiny baby. Let them ask for more.',
    'just you',
    8,
    'Kids adore hearing their own origin story. You can do it with your eyes closed.',
  ),
  idea(
    'e3',
    'empty',
    "Play 'guess what I'm drawing' with a finger on their back.",
    'just you',
    7,
    "Gentle touch calms you both, and it's a quiet game from the couch.",
  ),
  idea(
    'e4',
    'empty',
    'You are a sleepy bear in a cave. They have to wake you with three silly things.',
    'just you',
    8,
    'You literally play it lying down. Their job is to make you laugh.',
  ),
  idea(
    'e5',
    'empty',
    'Twenty questions. They pick something in the room, you guess.',
    'just you',
    6,
    'No props, no movement, and it stretches their thinking.',
  ),
  idea(
    'e6',
    'empty',
    "Let them give you a 'spa day' — brush your hair, pat your face.",
    'just you',
    10,
    'They feel trusted and grown-up while you genuinely rest.',
  ),
  idea(
    'e7',
    'empty',
    "Make up the world's slowest race: who can crawl to the door slowest.",
    'just you',
    5,
    'Slow is the point. Giggles with almost zero effort.',
  ),
  idea(
    'e8',
    'empty',
    'Describe a dream house together, room by ridiculous room.',
    'just you',
    8,
    'Pure imagination, fully reclined. Follow their wild ideas.',
  ),

  // ---- SOME: sitting, low effort ----
  idea(
    's1',
    'some',
    'Build the tallest tower you can from anything on the table, then knock it down.',
    'cushions, cups, books',
    10,
    'The crash is the joy. Let them be the demolisher.',
  ),
  idea(
    's2',
    'some',
    'Draw a monster together — you do the head, they do the body, swap.',
    'paper, pen',
    12,
    'Collaborative silliness; no skill required from you.',
  ),
  idea(
    's3',
    'some',
    'Sock puppets. Two socks, two voices, one tiny show.',
    '2 socks',
    10,
    'You can sit the whole time. Let them write the plot.',
  ),
  idea(
    's4',
    'some',
    "Play café: they take your order and 'serve' you. Tip generously with praise.",
    'cups, cushions',
    12,
    'Pretend play builds language, and you get to sit and be served.',
  ),
  idea(
    's5',
    'some',
    'Card game: snap, go fish, or invent your own rules together.',
    'a deck of cards',
    12,
    'Easy turn-taking; letting them make up rules makes it theirs.',
  ),
  idea(
    's6',
    'some',
    "Hide a small object and guide them with 'warmer / colder'.",
    'any small toy',
    8,
    'They run, you stay put and direct. Beautiful trade.',
  ),
  idea(
    's7',
    'some',
    'Make a paper boat or plane and test which flies or floats best.',
    'paper',
    12,
    'A tiny project with a payoff you discover together.',
  ),
  idea(
    's8',
    'some',
    "Play 'restaurant critic' for their imaginary meals. Rate each dish dramatically.",
    'play food or none',
    10,
    'Your over-the-top reactions are the whole game.',
  ),
  idea(
    's9',
    'some',
    'Stack a story: each of you adds one sentence. See where it goes.',
    'just you',
    8,
    'Co-creating a wild tale, no standing required.',
  ),

  // ---- GOOD: up and moving ----
  idea(
    'g1',
    'good',
    'Floor-is-lava across the living room. You set the course.',
    'cushions',
    12,
    'Big movement, big laughs, and they feel like the hero.',
  ),
  idea(
    'g2',
    'good',
    'Indoor treasure hunt: hide 5 things and draw a little map.',
    'paper, small things',
    15,
    'Setup is quick and the hunt buys real connection time.',
  ),
  idea(
    'g3',
    'good',
    'Dance party — they pick three songs, you commit fully to one.',
    'music',
    10,
    'Letting loose with them is pure bonding fuel.',
  ),
  idea(
    'g4',
    'good',
    "Balloon keep-it-up: don't let it touch the floor.",
    'a balloon',
    10,
    'Simple, hilarious, and surprisingly tiring for them (bonus).',
  ),
  idea(
    'g5',
    'good',
    'Build a blanket fort and read inside it with a torch.',
    'blankets, torch',
    15,
    'A fort is a memory. The cozy ending winds you both down.',
  ),
  idea(
    'g6',
    'good',
    'Obstacle course: crawl under, jump over, spin around. Time each other.',
    'furniture',
    12,
    'They burn energy; you cheer and time. Great trade.',
  ),
  idea(
    'g7',
    'good',
    'Kitchen helpers: let them really help make something simple.',
    'a snack to make',
    15,
    'Working side by side is connection that also feeds everyone.',
  ),
  idea(
    'g8',
    'good',
    'Go outside and follow them — wherever they go, you go, for 10 minutes.',
    'outside',
    12,
    "Child-led wandering. You don't plan a thing.",
  ),
];

/** Rotating de-guilt notes for tired parents — the emotional core. */
export const NOTES: string[] = [
  "You don't have to be fun. You just have to say yes.",
  'Five tired minutes with you beats an hour of you somewhere else.',
  'Showing up drained still counts. It really does.',
  "They won't remember the mess or the dishes. They'll remember you said yes.",
  'You can play lying down. Presence matters more than energy.',
  "It's okay to be tired. Pick the smallest yes and start there.",
  "Your kid isn't asking for a performance. They're asking for you.",
];

export const COPY = {
  name: 'Play With Me',
  tagline: 'Too tired to think? Tap once.',
  ask: 'Your kid wants to play.',
  askSub: 'How much do you have in you right now?',
  emptyReassure: "That's okay. Here's something you can do without getting up.",
} as const;
