import type { Metadata } from '@/types/common';
import type { AppDependency, Artifact, Module, ModuleDescriptor } from '@/types/mgr-applications';

export interface AppDescriptor extends Artifact {
  /**
   * A description of application manager
   */
  description?: string;

  /**
   * Metadata information (read-only)
   */
  metadata?: Metadata;

  /**
   * List of modules which are grouped by the application
   */
  modules?: Module[];

  /**
   * List of ui-modules which are grouped by the application
   */
  uiModules?: Module[];

  /**
   * List of module descriptors which are grouped by the application
   */
  moduleDescriptors?: ModuleDescriptor[];

  /**
   * List of ui module descriptors which are grouped by the application
   */
  uiModuleDescriptors?: ModuleDescriptor[];

  /**
   * Information about version of a platform
   */
  platform?: string;

  /**
   * List of dependencies to other applications
   */
  dependencies?: AppDependency[];
}
