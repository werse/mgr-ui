import { httpClient } from '@/integration/http-client';
import type { QueryParams } from '@/types/api/QueryParams';
import type { EntitlementsCollection } from '@/types/mgr-tenant-entitlements';
import type { EntitlementFlow, EntitlementFlowsCollection } from '@/types/mgr-tenant-entitlements/flow';

export class EntitlementClient {
  static async findByQuery(queryParams: QueryParams = {}): Promise<EntitlementsCollection> {
    return httpClient.get('/applications', { queryParams });
  }

  static async findEntitlementFlowsByQuery(queryParams: QueryParams = {}): Promise<EntitlementFlowsCollection> {
    return httpClient.get('/entitlement-flows', { queryParams });
  }

  static async getEntitlementFlowById(id: string): Promise<EntitlementFlow> {
    const pathVariables = [id];
    return httpClient.get('/entitlement-flows/{id}', { pathVariables });
  }
}
