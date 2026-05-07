/**
 * Parses a localized price string into a float.
 * Handles formats like "1 299,99 р." → 1299.99
 */
export function parsePrice(text: string | null): number {
  if (!text) return 0;
  return Number(text.replace(/[^\d,]/g, '').replace(',', '.'));
}