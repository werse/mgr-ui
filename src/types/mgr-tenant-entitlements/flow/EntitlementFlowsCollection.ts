import type { EntitlementFlow } from '@/types/mgr-tenant-entitlements/flow';

export interface EntitlementFlowsCollection {
  totalRecords: number;
  flows: EntitlementFlow[];
}
