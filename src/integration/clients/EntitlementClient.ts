import { httpClient } from '@/integration/http-client';
import type { QueryParams } from '@/types/api/QueryParams';
import type { EntitlementsCollection } from '@/types/mgr-tenant-entitlements';

export class EntitlementClient {
  static async findByQuery(queryParams: QueryParams = {}): Promise<EntitlementsCollection> {
    return httpClient.get('/applications', { queryParams });
  }
}
