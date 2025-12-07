import type { Artifact } from '@/types/mgr-applications/Artifact.ts';

export interface AppDependency extends Artifact {
  optional?: boolean;
}
