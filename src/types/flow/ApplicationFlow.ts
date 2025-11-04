import type { ExecutionStatus } from '@/types/flow/ExecutionStatus.ts';
import type { EntitlementType } from '@/types/flow/EntitlementType.ts';
import type { FlowStage } from '@/types/flow/FlowStage.ts';

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
