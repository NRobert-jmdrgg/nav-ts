/**
 * ISO dátum átkonvertálása YYYY-mm-ddThh:mm:ss formátumra.
 * @param {Date} timestamp dátum
 * @returns {string} YYYYmmddhhmmss formátumú dátum
 */
export default function maskIsoDate(timestamp: string): string {
  return timestamp.substring(0, 19).replace(/-|:|T/g, '');
}
