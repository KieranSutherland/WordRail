import { processText } from "./textProcessor"


describe('processText', () => {
    it('should handle single word', () => {
        const result = processText('hello');
        expect(result).toEqual(['hello']);
    });

    it('should trim leading and trailing whitespace', () => {
        const result = processText('  hello world  ');
        expect(result).toEqual(['hello', 'world']);
    });

    it('should handle multiple spaces between words', () => {
        const result = processText('hello    world');
        expect(result).toEqual(['hello', 'world']);
    });

    it('should preserve words at max length (10 characters)', () => {
        const result = processText('exactly10c');
        expect(result).toEqual(['exactly10c']);
    });

    it('should not split words under max length', () => {
        const result = processText('short words here');
        expect(result).toEqual(['short', 'words', 'here']);
    });

    it('should split long words evenly with hyphens', () => {
        const result = processText('longwordhere');
        expect(result).toEqual(['longwo-', 'rdhere']);
    });

    it('should split very long words into multiple chunks', () => {
        const result = processText('verylongwordthatistwenty');
        expect(result).toEqual(['verylon-', 'gwordth-', 'atistwenty']);
    });

    it('should handle mix of short and long words', () => {
        const result = processText('short verylongword test');
        expect(result).toEqual(['short', 'verylong-', 'word', 'test']);
    });

    it('should handle existing hyphens', () => {
        const result = processText('well-known');
        expect(result).toEqual(['well-', 'known']);
    });

    it('should handle em-dashes', () => {
        const result = processText('hello—world');
        expect(result).toEqual(['hello—', 'world']);
    });

    it('should handle empty string', () => {
        const result = processText('');
        expect(result).toEqual([]);
    });

    it('should handle only whitespace', () => {
        const result = processText('   ');
        expect(result).toEqual([]);
    });

    it('should split word at exactly 11 characters', () => {
        const result = processText('elevenlettr');
        expect(result).toEqual(['elevenl-', 'ettr']);
    });

    it('should split word at 20 characters into even chunks', () => {
        const result = processText('12345678901234567890');
        expect(result).toEqual(['12345678-', '90123456-', '7890']);
    });

    it('should handle newlines and tabs as whitespace', () => {
        const result = processText('hello\nworld\ttest');
        expect(result).toEqual(['hello', 'world', 'test']);
    });

    it('should handle multiple long words in sequence', () => {
        const result = processText('verylongword anotherlongword');
        expect(result).toEqual(['verylong-', 'word', 'anotherlo-', 'ngword']);
    });

    it('should handle punctuation attached to long words', () => {
        const result = processText('verylongword.');
        expect(result).toEqual(['verylong-', 'word.']);
    });
});