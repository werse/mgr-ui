import type { Artifact } from '@/types/mgr-applications/Artifact.ts';

export interface Module extends Artifact {
  url?: string;
}
