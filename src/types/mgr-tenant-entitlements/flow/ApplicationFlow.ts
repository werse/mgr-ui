import type { EntitlementType, ExecutionStatus, FlowStage } from '@/types/mgr-tenant-entitlements/flow';

export type ApplicationFlow = {
  id: string;
  applicationId: string;
  tenantId: string;
  flowId: string;
  type: EntitlementType;
  status: ExecutionStatus;
  startedAt: string;
  finishedAt: string;
  stages: FlowStage[];
};
