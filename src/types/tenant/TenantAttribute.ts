import type { Identifiable, Metadata } from '@/types/common';

export interface TenantAttribute extends Identifiable {
  id: string;
  key: string;
  value?: string;
  metadata?: Metadata;
}
