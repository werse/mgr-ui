import type { ModuleDiscovery } from '@/types/mgr-applications';

export interface ModuleDiscoveryCollection {
  totalRecords: number;
  discovery: ModuleDiscovery[];
}
