import type { ExecutionStatus } from '@/types/flow/ExecutionStatus.ts';

export type FlowStage = {
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
