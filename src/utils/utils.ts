/**
 * @description Checks if a given value is considered "empty".
 * @param {unknown} value - The value to be checked for emptiness.
 * @returns {boolean} - Returns `true` if the value is empty, otherwise `false`.
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === undefined) return true;

  if (
    typeof value === 'function' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    Object.prototype.toString.call(value) === '[object Date]'
  )
    return false;

  // Null or empty string, array-like values
  if (
    value == null ||
    ((Array.isArray(value) || typeof value === 'string') && value.length === 0)
  ) {
    return true;
  }

  // Check if the value is an object and has no keys
  if (typeof value === 'object' && Object.keys(value as object).length === 0) {
    return true;
  }

  return false;
};
