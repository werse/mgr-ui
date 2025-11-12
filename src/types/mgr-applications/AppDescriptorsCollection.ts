import type { AppDescriptor } from '@/types/mgr-applications';

export type AppDescriptorsCollection = {
  applicationDescriptors: AppDescriptor[]
  totalRecords: number;
}
