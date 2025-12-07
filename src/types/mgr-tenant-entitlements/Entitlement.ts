import type { Identifiable } from '@/types/common';

export interface Entitlement extends Identifiable {
  applicationId: string;
  tenantId: string;
  tenantName?: string; // loaded by UI
  modules?: string[];
}
