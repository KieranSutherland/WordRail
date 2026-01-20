/**
 * Lightens a hex color by a percentage
 * @param hex - Hex color string (e.g., '#3A86FF')
 * @param percent - Percentage to lighten (0-100)
 */
export function lightenColor(hex: string, percent: number): string {
    const cleanHex = hex.replace('#', '');
    
    const num = parseInt(cleanHex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    
    const lighten = (channel: number) => {
        return Math.min(255, Math.floor(channel + (255 - channel) * (percent / 100)));
    };
    
    const newR = lighten(r);
    const newG = lighten(g);
    const newB = lighten(b);
    
    return `#${((1 << 24) | (newR << 16) | (newG << 8) | newB).toString(16).slice(1)}`;
};

/**
 * Darkens a hex color by a percentage
 * @param hex - Hex color string (e.g., '#3A86FF')
 * @param percent - Percentage to darken (0-100)
 */
export function darkenColor(hex: string, percent: number): string {
    const cleanHex = hex.replace('#', '');
    
    const num = parseInt(cleanHex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    
    const darken = (channel: number) => {
        return Math.max(0, Math.floor(channel * (1 - percent / 100)));
    };
    
    const newR = darken(r);
    const newG = darken(g);
    const newB = darken(b);
    
    return `#${((1 << 24) | (newR << 16) | (newG << 8) | newB).toString(16).slice(1)}`;
};