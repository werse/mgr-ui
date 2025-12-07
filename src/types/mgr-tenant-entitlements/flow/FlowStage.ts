import type { ExecutionStatus } from '@/types/mgr-tenant-entitlements/flow';
import type { Identifiable } from '@/types/common';

export interface FlowStage extends Identifiable {
  flowId: string;
  name: string;
  status: ExecutionStatus;
  errorType?: string | null;
  errorMessage?: string | null;
  startedAt: string;
  finishedAt: string;
  retriesCount: number;
  retriesInfo?: string;
}
