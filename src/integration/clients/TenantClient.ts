import { httpClient } from '@/integration/http-client';
import type { Tenant, TenantCollection } from '@/types/tenant';
import type { QueryParams } from '@/types/api/QueryParams';

export class TenantClient {
  /**
   * Get all tenants
   * @param {Object} queryParams - Optional query parameters
   * @returns {Promise<Array>} Array of tenant objects
   */
  static async findByQuery(queryParams: QueryParams = {}): Promise<TenantCollection> {
    return httpClient.get('/tenants', { queryParams });
  }

  /**
   * Get a specific tenant by ID
   * @param {string|number} id - The tenant ID
   * @returns {Promise<Object>} Tenant object
   */
  static async getById(id: string): Promise<Tenant> {
    const pathVariables = [id];
    return httpClient.get('/tenants/{id}', { pathVariables });
  }
}
