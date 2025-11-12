import type { ExecutionStatus } from '@/types/mgr-tenant-entitlements/flow';

export interface FlowStage {
  flowId: string;
  name: string;
  status: ExecutionStatus;
  errorType?: string | null;
  errorMessage?: string | null;
  startedAt: string;
  finishedAt: string;
  retriesCount: number;
  retriesInfo?: string;
};
