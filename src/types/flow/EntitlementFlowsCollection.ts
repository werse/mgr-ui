import type { EntitlementFlow } from '@/types/flow/EntitlementFlow.ts';

export type EntitlementFlowsCollection = {
  totalRecords: number;
  flows: EntitlementFlow[];
};
