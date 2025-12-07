import type {
  ApplicationFlow,
  EntitlementType,
  ExecutionStatus,
  FlowStage,
} from '@/types/mgr-tenant-entitlements/flow';
import type { Identifiable } from '@/types/common';

export interface EntitlementFlow extends Identifiable {
  status: ExecutionStatus;
  type: EntitlementType;
  tenantId: string;
  tenantName?: string;
  startedAt: string;
  finishedAt: string;
  stages: FlowStage[];
  applicationFlows: ApplicationFlow[];
}
