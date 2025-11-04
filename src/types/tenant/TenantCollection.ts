import type { Tenant } from '@/types/tenant';

export type TenantCollection = {
  tenants: Tenant[];
  totalRecords: number;
};
