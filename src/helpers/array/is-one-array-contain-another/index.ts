/**
 * Checks if one array contains all elements of another array.
 *
 * @param firstArray - The first array to compare.
 * @param secondArray - The second array to compare.
 * @param isStrict - Optional. If `true`, performs a strict comparison using `every()` else using `some()`. Default is `true`.
 * @returns `true` if `firstArray` contains all elements of `secondArray`, `false` otherwise.
 */

export default function isOneArrayContainAnother(
  firstArray: unknown[],
  secondArray: unknown[],
  isStrict = true,
) {
  if (isStrict) {
    return secondArray.every((item) => firstArray.includes(item));
  }

  return secondArray.some((item) => firstArray.includes(item));
}
