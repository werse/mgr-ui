import { Outlet, useParams } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner.tsx';
import { type NavigationTabDef, NavigationTabs } from '@/components/NavigationTabs';
import { PageHeader } from '@/components/PageHeader';
import { useApplicationById } from '@/hooks';

export const ApplicationPage = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const { isPending, data: application } = useApplicationById(applicationId);

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
    <div className="flex flex-col h-full overflow-hidden">
      <PageHeader title={`${application.id}`} />
      <NavigationTabs tabElements={tabElements} />
      <div className={'flex h-full w-full overflow-auto'}>
        <Outlet />
      </div>
    </div>
  );
};
