import type { ApplicationFlow } from '@/types/flow/ApplicationFlow.ts';
import type { FlowStage } from '@/types/flow/FlowStage.ts';
import type { EntitlementType } from '@/types/flow/EntitlementType.ts';
import type { ExecutionStatus } from '@/types/flow/ExecutionStatus.ts';

export type EntitlementFlow = {
  id: string;
  status: ExecutionStatus;
  type: EntitlementType;
  tenantId: string;
  startedAt: string;
  finishedAt: string;
  stages: FlowStage[];
  applicationFlows: ApplicationFlow[];
};
