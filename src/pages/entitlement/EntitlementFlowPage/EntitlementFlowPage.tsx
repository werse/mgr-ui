import { Outlet, useParams } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { type NavigationTabDef, NavigationTabs } from '@/components/NavigationTabs';
import { useQuery } from '@tanstack/react-query';
import { EntitlementClient } from '@/integration/clients';

export const EntitlementFlowPage = () => {
  const { flowId } = useParams<{ flowId: string }>();

  const { isPending, data } = useQuery({
    queryKey: ['entitlement-flow-by-id', flowId],
    queryFn: () => EntitlementClient.getEntitlementFlowById(flowId!),
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
      key: 'entitlement-flow-page-details',
      to: `/entitlement-flows/${flowId}/details`,
    },
    {
      title: 'Application Flows',
      key: 'entitlement-flow-page-app-flows',
      to: `/entitlement-flows/${flowId}/application-flows`,
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center">
      <PageHeader title={`Entitlement Flow: ${data.id}`} />
      <NavigationTabs tabElements={tabElements} />
      <Outlet />
    </div>
  );
};
