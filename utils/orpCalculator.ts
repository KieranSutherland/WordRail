export function getORPIndex(word: string): number {
    return Math.max(0, Math.round(0.4 * word.length));
}

export function getWordDelay(word: string, baseSpeed: number): number {
  const len = word.length;
  if (len <= 6) return baseSpeed;
  if (len <= 9) return baseSpeed * 1.3;
  if (len <= 12) return baseSpeed * 1.5;
  return baseSpeed * 1.8;
};