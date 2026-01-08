export function processText(text: string): string[] {
    // Split by whitespace, hyphens and em-dashes.
    return text
        .trim()
        .split(/\s+|(?<=[-\—])/)
        .filter(w => w.length > 0);
};