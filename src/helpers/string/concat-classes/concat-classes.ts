import { removeExtraSpaces } from 'helpers/string/remove-extra-spaces/remove-extra-spaces';

/**
 * Concatenates an array of strings into a single string, removing extra spaces between class names.
 *
 * @returns A single string with all class names concatenated together with extra spaces removed.
 * @param classList - An array of strings representing class names.
 */
function concatClasses(classList: string[]) {
  return classList.map(removeExtraSpaces).join(' ');
}

export { concatClasses };
