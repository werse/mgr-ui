import type { Identifiable, Metadata } from '@/types/common';
import type { TenantAttribute } from '@/types/tenant';

export interface Tenant extends Identifiable {
  id: string;
  name: string;
  description?: string;
  type?: string;
  secure?: boolean;
  attributes?: TenantAttribute[];
  metadata?: Metadata;
}
