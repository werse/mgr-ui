import type { Metadata } from '@/types/common/Metadata.ts';
import type { TenantAttribute } from '@/types/tenant/TenantAttribute.ts';

export type Tenant = {
  id: string;
  name: string;
  description?: string;
  type?: string;
  secure?: boolean;
  attributes?: TenantAttribute[];
  metadata?: Metadata;
};
