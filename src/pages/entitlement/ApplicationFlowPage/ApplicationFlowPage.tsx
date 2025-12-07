import { Outlet, useParams } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { type NavigationTabDef, NavigationTabs } from '@/components/NavigationTabs';
import { useQuery } from '@tanstack/react-query';
import { EntitlementClient } from '@/integration/clients';

export const ApplicationFlowPage = () => {
  const { flowId } = useParams<{ flowId: string }>();

  const { isPending, data } = useQuery({
    queryKey: ['application-flow-by-id', flowId],
    queryFn: () => EntitlementClient.getApplicationFlowById(flowId!),
  });

  if (isPending) {
    return <div className="p-6">Loading entitlement flows...</div>;
  }

  if (!data) {
    return <div className="p-6">Entitlement flow not found by id...</div>;
  }

  const tabElements: NavigationTabDef[] = [
    {
      title: 'Details',
      key: 'app-flow-page-details',
      to: `/application-flows/${flowId}/details`,
    },
    {
      title: 'Flow Stages',
      key: 'app-flow-stages',
      to: `/application-flows/${flowId}/stages`,
    },
  ];
  return (
    <div className="w-full flex flex-col justify-center">
      <PageHeader title={`Application Flow: ${data.id}`} />
      <NavigationTabs tabElements={tabElements} />
      <Outlet />
    </div>
  );
};
