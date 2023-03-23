/**
 * Removes extra spaces from a string.
 *
 * @param {string} str - The string to remove extra spaces from.
 * @returns {string} The string with extra spaces removed.
 */
function removeExtraSpaces(str: string) {
  return str.replace(/\s+/g, ' ').trim();
}

export { removeExtraSpaces };
