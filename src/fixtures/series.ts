import type { Series } from "../types/book";

export const series: Series[] = [
  { id: "series-lotr", name: "The Lord of the Rings" },
  { id: "series-stormlight", name: "The Stormlight Archive" },
  { id: "series-expanse", name: "The Expanse" },
  { id: "series-broken-earth", name: "The Broken Earth" },
];

// Typed constants for use in books.ts — avoids raw string literals at call sites
export const SERIES_IDS = {
  LOTR: "series-lotr",
  STORMLIGHT: "series-stormlight",
  EXPANSE: "series-expanse",
  BROKEN_EARTH: "series-broken-earth",
} as const;
