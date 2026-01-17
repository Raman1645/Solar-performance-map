// Enhanced color scale utility for performance visualization
// Provides smooth gradient from red (poor) to green (excellent)

export const getColorFromRank = (rankRatio) => {
    if (rankRatio === null || rankRatio === undefined) {
        return "#374151"; // Gray for no data
    }

    // Smooth gradient: red -> orange -> yellow -> green
    if (rankRatio < 0.33) {
        // Red to Orange transition
        const t = rankRatio * 3;
        const r = 239;
        const g = Math.floor(68 + t * 95); // 68 -> 163
        const b = 68;
        return `rgb(${r}, ${g}, ${b})`;
    } else if (rankRatio < 0.66) {
        // Orange to Yellow transition
        const t = (rankRatio - 0.33) * 3;
        const r = Math.floor(239 - t * 35); // 239 -> 234
        const g = Math.floor(163 + t * 76); // 163 -> 239
        const b = 68;
        return `rgb(${r}, ${g}, ${b})`;
    } else {
        // Yellow to Green transition
        const t = (rankRatio - 0.66) * 3;
        const r = Math.floor(234 - t * 168); // 234 -> 34
        const g = 239 - Math.floor(t * 43); // 239 -> 197
        const b = 68 + Math.floor(t * 26); // 68 -> 94
        return `rgb(${r}, ${g}, ${b})`;
    }
};

// Alternative: Get color based on absolute PR value (0-1 scale)
export const getColorFromValue = (value, min = 0, max = 1) => {
    if (value === null || value === undefined || !Number.isFinite(value)) {
        return "#374151";
    }

    const normalized = (value - min) / (max - min);
    return getColorFromRank(normalized);
};

// Get text color for contrast on background
export const getContrastColor = (rankRatio) => {
    if (rankRatio === null || rankRatio === undefined) {
        return "#ffffff";
    }

    // Use white text for darker backgrounds, black for lighter
    return rankRatio < 0.5 ? "#ffffff" : "#000000";
};