// utils.ts

/**
 * Utility function to conditionally join classNames.
 * @param classes - Array of class names.
 * @returns Concatenated string of class names.
 */


// Example utility function
export function cn(...classes: (string | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
  }
  