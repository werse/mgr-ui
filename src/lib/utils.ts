import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Location } from 'react-router-dom';

export const DEFAULT_OFFSET = 0;
export const MAX_QUERY_LIMIT = 100;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIntParamOrDefault(value: string | null, defaultValue: number): number {
  if (value === null) {
    return defaultValue;
  }

  return parseInt(value) || defaultValue;
}

export function getMaxQueryLimit(limit: number, defaultValue: number = MAX_QUERY_LIMIT): number {
  return limit <= 0 || limit > defaultValue ? MAX_QUERY_LIMIT : defaultValue;
}

export function getBackReference(location: Location) {
  return { from: { pathname: location.pathname, search: location.search } };
}
