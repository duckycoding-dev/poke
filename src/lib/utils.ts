import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Delays execution for a specified number of milliseconds.
 * @param ms Number of milliseconds to delay
 * @returns A promise that resolves after the specified delay
 */
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}