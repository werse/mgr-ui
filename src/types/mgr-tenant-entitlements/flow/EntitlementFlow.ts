import type {
  ApplicationFlow,
  EntitlementType,
  ExecutionStatus,
  FlowStage,
} from '@/types/mgr-tenant-entitlements/flow';

export interface EntitlementFlow {
  id: string;
  status: ExecutionStatus;
  type: EntitlementType;
  tenantId: string;
  tenantName?: string
  startedAt: string;
  finishedAt: string;
  stages: FlowStage[];
  applicationFlows: ApplicationFlow[];
}
