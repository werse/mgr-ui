import { httpClient } from '@/integration/http-client';
import type { QueryParams } from '@/types/api/QueryParams';
import type { AppDescriptor, AppDescriptorsCollection } from '@/types/mgr-applications';
import type { ModuleDiscoveryCollection } from '@/types/mgr-applications/ModuleDiscoveryCollection.ts';

export class ApplicationClient {
  static async findByQuery(queryParams: QueryParams = {}): Promise<AppDescriptorsCollection> {
    return httpClient.get('/applications', { queryParams });
  }

  static async findModuleDiscoveryByQuery(
    id: string,
    queryParams: QueryParams = {},
  ): Promise<ModuleDiscoveryCollection> {
    const pathVariables = [id];
    return httpClient.get('/applications/discovery', { pathVariables, queryParams });
  }

  static async getApplicationModuleDiscovery(
    id: string,
    queryParams: QueryParams = {},
  ): Promise<ModuleDiscoveryCollection> {
    const pathVariables = [id];
    return httpClient.get('/applications/{id}/discovery', { pathVariables, queryParams });
  }

  static async getById(id: string): Promise<AppDescriptor> {
    const pathVariables = [id];
    return httpClient.get('/applications/{id}', { pathVariables });
  }
}
