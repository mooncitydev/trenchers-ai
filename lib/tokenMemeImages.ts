export const TOKEN_MEME_COUNT = 29;

export function memeFileIndex(imageIndex: number): number {
  const n = imageIndex % TOKEN_MEME_COUNT;
  return n < 0 ? n + TOKEN_MEME_COUNT : n;
}

export function memeFileStem(imageIndex: number): string {
  return String(memeFileIndex(imageIndex) + 1);
}

export function stableImageIndex(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }

  return Math.abs(h) % TOKEN_MEME_COUNT;
}
