import type { Artifact } from '@/types/mgr-applications/Artifact.ts';
import type { Identifiable } from '@/types/common';

export interface ModuleDescriptor extends Artifact, Identifiable {}
