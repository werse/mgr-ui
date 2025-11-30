import type { ApplicationFlow } from '@/types/mgr-tenant-entitlements/flow';

export interface ApplicationFlowsCollection {
  applicationFlows: ApplicationFlow[];
  totalRecords: number;
}
