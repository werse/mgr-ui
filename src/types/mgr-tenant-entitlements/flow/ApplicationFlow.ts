import type { EntitlementType, ExecutionStatus, FlowStage } from '@/types/mgr-tenant-entitlements/flow';
import type { Identifiable } from '@/types/common';

export interface ApplicationFlow extends Identifiable {
  applicationId: string;
  tenantId: string;
  tenantName?: string; // can be loaded by UI
  flowId: string;
  type: EntitlementType;
  status: ExecutionStatus;
  startedAt: string;
  finishedAt: string;
  stages: FlowStage[];
}
