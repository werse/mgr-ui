import type { PathVariable } from '@/types/api/PathVariable.ts';
import type { QueryParams } from '@/types/api/QueryParams.ts';

export interface RequestOptions {
  pathVariables?: PathVariable[];
  queryParams?: QueryParams;
  body?: unknown;
  headers?: Record<string, string>;
}
