import { Outlet, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { Tenant } from '@/types/tenant';
import { ApplicationClient } from '@/integration/clients';
import { Spinner } from '@/components/ui/spinner.tsx';
import { type NavigationTabDef, NavigationTabs } from '@/components/NavigationTabs';
import { PageHeader } from '@/components/PageHeader';

export const ApplicationPage = () => {
  const location = useLocation();
  const backReference = location.state && location.state.from;
  const { applicationId } = useParams<{ applicationId: string }>();
  const { isPending, data: application } = useQuery<Tenant>({
    queryKey: ['tenant-by-id', applicationId],
    queryFn: () => ApplicationClient.getById(applicationId!),
  });

  if (isPending) {
    return (
      <div className="p-6">
        <Spinner className="size-8" />
        <span>Loading application...</span>
      </div>
    );
  }

  if (!application) {
    return <div className="p-6">Application not found</div>;
  }

  const tabElements: NavigationTabDef[] = [
    {
      title: 'Details',
      key: 'app-page-details',
      to: `/applications/${applicationId}/details`,
    },
    {
      title: 'Entitlements',
      key: 'app-page-entitlements',
      to: `/applications/${applicationId}/entitlements`,
    },
    {
      title: 'Application Flows',
      key: 'app-page-flows',
      to: `/applications/${applicationId}/flows`,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <PageHeader title={application.name} backReference={backReference} />
      <NavigationTabs tabElements={tabElements} redirectState={{ from: backReference }} />
      <div className={'h-full flex w-full min-w-full'}>
        <Outlet />
      </div>
    </div>
  );
};
