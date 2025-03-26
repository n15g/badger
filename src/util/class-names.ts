/**
 * Generates a space-separated string of class names where the value is true.
 * @param classes - An object where keys are class names and values are booleans.
 * @returns A string of class names separated by spaces.
 */
export function classNames(classes: Record<string, boolean>): string {
  return Object.entries(classes)
    .filter(([, isActive]) => isActive)
    .map(([className]) => className)
    .join(' ')
}
