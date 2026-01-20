// export function processText(text: string): string[] {
//     // Split by whitespace, hyphens and em-dashes.
//     return text
//         .trim()
//         .split(/\s+|(?<=[-\—])/)
//         .filter(w => w.length > 0);
// };

export function processText(text: string): string[] {
    const MAX_WORD_LENGTH = 8;
    
    // Split by whitespace, hyphens and em-dashes
    const words = text
        .trim()
        .split(/\s+|(?<=[-\—])/)
        .filter(w => w.length > 0);
    
    // Process each word to split long ones
    const processedWords: string[] = [];
    
    for (const word of words) {
        if (word.length <= MAX_WORD_LENGTH) {
            processedWords.push(word);
        } else {
            // Split long word into evenly sized chunks
            const chunks = splitWordEvenly(word, MAX_WORD_LENGTH);
            processedWords.push(...chunks);
        }
    }
    
    return processedWords;
}

function splitWordEvenly(word: string, maxLength: number): string[] {
    const chunks: string[] = [];
    let remaining = word;
    
    while (remaining.length > maxLength) {
        // Take maxLength characters and add hyphen
        const chunk = remaining.slice(0, maxLength);
        chunks.push(chunk + '-');
        remaining = remaining.slice(maxLength);
    }
    
    // Add the last chunk without hyphen
    if (remaining.length > 0) {
        chunks.push(remaining);
    }
    
    return chunks;
}