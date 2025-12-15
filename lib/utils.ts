import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Canonical className utility
 * Used across all UI + shell components
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
