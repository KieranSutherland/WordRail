export function processText(text: string): string[] {
  return text
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 0);
};