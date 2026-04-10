/**
 * Meme avatars in `public/assets/`: `1.jpg`, `2.png`, … up to `TOKEN_MEME_COUNT`.
 * Keep `TOKEN_MEME_COUNT` in sync with how many numbered files you ship.
 */
export const TOKEN_MEME_COUNT = 29;

export function memeFileIndex(imageIndex: number): number {
  const n = imageIndex % TOKEN_MEME_COUNT;
  return n < 0 ? n + TOKEN_MEME_COUNT : n;
}

/** 1-based file stem for URL: `"1"` … `"29"` */
export function memeFileStem(imageIndex: number): string {
  return String(memeFileIndex(imageIndex) + 1);
}

/**
 * Pick a stable asset index (0 … TOKEN_MEME_COUNT-1) from a token name/id so
 * the same ticker always gets the same avatar in Hero, Live Feed, and Terminal.
 */
export function stableImageIndex(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % TOKEN_MEME_COUNT;
}
