import type { Artifact } from '@/types/mgr-applications/Artifact.ts';

export interface ModuleDiscovery extends Artifact {
  location: string;
}
