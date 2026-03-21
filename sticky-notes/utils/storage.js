.pragma library

// storage.js — Utility functions for sticky-notes

/**
 * Generate a unique note ID.
 */
function generateNoteId() {
    return `note_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Sticky note color palette — soft pastels.
 */
const stickyColors = [
    "#FFF9C4", // soft yellow
    "#E8F5E9", // soft green
    "#E3F2FD", // soft blue
    "#FCE4EC", // soft pink
    "#F3E5F5", // soft lavender
    "#FFF3E0", // soft peach
    "#E0F7FA", // soft cyan
    "#F1F8E9"  // soft lime
];

/**
 * Pick a random sticky-note color from the palette.
 */
function pickRandomColor() {
    return stickyColors[Math.floor(Math.random() * stickyColors.length)];
}

/**
 * Format a Date object to a human-readable relative time string.
 * Supports i18n via pluginApi.tr() when available.
 *
 * @param {Date} date - The date to format
 * @param {Object} [pluginApi] - Optional plugin API for i18n
 */
function formatDate(date, pluginApi) {
    if (!date) return "";

    const t = (key, fallback) => {
        if (pluginApi && pluginApi.tr) {
            const r = pluginApi.tr(key);
            if (r && r !== key) return r;
        }
        return fallback;
    };

    const d = (date instanceof Date) ? date : new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return t("time.just-now", "Just now");
    if (diffMins < 60) return t("time.minutes-ago", "{n}m ago").replace("{n}", diffMins);

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return t("time.hours-ago", "{n}h ago").replace("{n}", diffHours);

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return t("time.days-ago", "{n}d ago").replace("{n}", diffDays);

    const year = d.getFullYear();
    const mo = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');

    if (year === now.getFullYear()) {
        return `${mo}/${day}`;
    }
    return `${year}/${mo}/${day}`;
}
