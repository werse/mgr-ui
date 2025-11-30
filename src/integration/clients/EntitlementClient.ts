import { httpClient } from '@/integration/http-client';
import type { QueryParams } from '@/types/api/QueryParams';
import type { EntitlementsCollection } from '@/types/mgr-tenant-entitlements';
import type {
  ApplicationFlowsCollection,
  EntitlementFlow,
  EntitlementFlowsCollection,
} from '@/types/mgr-tenant-entitlements/flow';
import { TenantClient } from '@/integration/clients/TenantClient.ts';
import { getUniqueIdentifiers } from '@/lib/utils.ts';

export class EntitlementClient {
  static async findByQuery(
    includeTenantNames: boolean,
    queryParams: QueryParams = {},
  ): Promise<EntitlementsCollection> {
    const queryResult = (await httpClient.get('/entitlements', { queryParams })) as EntitlementsCollection;
    if (includeTenantNames) {
      const tenantIds = [...new Set(queryResult.entitlements.map((e) => e.tenantId))];
      const tenantsResult = await TenantClient.getByIds(tenantIds);
      const tenantsMap = new Map<string, string>(tenantsResult.tenants.map((t) => [t.id, t.name]));
      queryResult.entitlements.forEach((e) => (e.tenantName = tenantsMap.get(e.tenantId)));
      return queryResult;
    }

    return queryResult;
  }

  static async findEntitlementFlowsByQuery(
    includeTenantNames: boolean,
    queryParams: QueryParams = {},
  ): Promise<EntitlementFlowsCollection> {
    const result = (await httpClient.get('/entitlement-flows', { queryParams })) as EntitlementFlowsCollection;
    if (includeTenantNames) {
      const tenantsResult = await TenantClient.getByIds(getUniqueIdentifiers(result.flows, (e) => e.tenantId));
      const tenantsMap = new Map<string, string>(tenantsResult.tenants.map((t) => [t.id, t.name]));
      result.flows.forEach((flow) => (flow.tenantName = tenantsMap.get(flow.tenantId)));
      return result;
    }
    return result;
  }

  static async findApplicationFlowsByQuery(
    includeTenantNames: boolean,
    queryParams: QueryParams = {},
  ): Promise<ApplicationFlowsCollection> {
    const result = (await httpClient.get('/application-flows', { queryParams })) as ApplicationFlowsCollection;
    if (includeTenantNames) {
      let tenantIds = getUniqueIdentifiers(result.applicationFlows, (e) => e.tenantId);
      const tenantsResult = await TenantClient.getByIds(tenantIds);
      const tenantsMap = new Map<string, string>(tenantsResult.tenants.map((t) => [t.id, t.name]));
      result.applicationFlows.forEach((flow) => (flow.tenantName = tenantsMap.get(flow.tenantId)));
      return result;
    }

    return result;
  }

  static async getEntitlementFlowById(id: string): Promise<EntitlementFlow> {
    const pathVariables = [id];
    return httpClient.get('/entitlement-flows/{id}', { pathVariables });
  }
}
