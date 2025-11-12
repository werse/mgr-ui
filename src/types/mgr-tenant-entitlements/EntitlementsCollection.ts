import type { Entitlement } from '@/types/mgr-tenant-entitlements';

export interface EntitlementsCollection {
  totalRecords: number;
  entitlements: Entitlement[];
}
