import type { QueryParams } from '@/types/api';
import { httpClient } from '@/integration/http-client';
import type { ModuleDescriptor } from '@/types/mgr-applications';

const MODULE_REGISTRY_BASE_URL = 'https://folio-registry.dev.folio.org';

export class ModuleRegistryClient {
  static async find(queryParams: QueryParams = {}): Promise<ModuleDescriptor[]> {
    return httpClient.getAbs(MODULE_REGISTRY_BASE_URL, '/_/proxy/modules', { queryParams });
  }
}
