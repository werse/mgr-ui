import type { FlowStage } from '@/types/mgr-tenant-entitlements/flow';
import type { Identifiable } from '@/types/common';

export interface FlowStageCollection extends Identifiable {
  stages: FlowStage[];
  totalRecords: number;
}
