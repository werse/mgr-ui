import type { Metadata } from '@/types/common/Metadata.ts';

export type TenantAttribute = {
  id: string;
  key: string;
  value?: string;
  metadata?: Metadata
}
