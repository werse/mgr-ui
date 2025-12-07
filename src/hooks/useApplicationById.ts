import { useQuery } from '@tanstack/react-query';
import { ApplicationClient } from '@/integration/clients';
import type { AppDescriptor } from '@/types/mgr-applications';

export const useApplicationById = (applicationId?: string) => {
  return useQuery<AppDescriptor>({
    queryKey: ['application-by-id', applicationId],
    queryFn: () => ApplicationClient.getById(applicationId!, true),
    enabled: Boolean(applicationId),
    retry: false,
    staleTime: 5 * 1000, // 5 seconds
  });
};
