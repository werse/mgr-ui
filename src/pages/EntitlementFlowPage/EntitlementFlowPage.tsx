import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ENTITLEMENT_FLOWS_SAMPLE_DATA } from '@/pages/EntitlementFlowsPage/data.ts';
import { PageHeader } from '@/components/PageHeader';
import { type NavigationTabDef, NavigationTabs } from '@/components/NavigationTabs';

export const EntitlementFlowPage = () => {
  const location = useLocation();
  const backReference = location.state && location.state.from;
  const { flowId } = useParams<{ flowId: string }>();
  const navigate = useNavigate();
  const entitlementFlow = ENTITLEMENT_FLOWS_SAMPLE_DATA.flows.find((flow) => flow.id == flowId);
  if (!entitlementFlow) {
    navigate('/not-found');
    return null;
  }

  const tabElements: NavigationTabDef[] = [
    {
      title: 'Stages',
      key: 'entitlement-flow-page-stages',
      to: `/entitlements/entitlement-flows/${flowId}/stages`,
    },
    {
      title: 'Application Flows',
      key: 'entitlement-flow-page-app-flows',
      to: `/entitlements/applications-flows/${flowId}/application-flows`,
    },
  ];
  return (
    <div className="w-full flex flex-col justify-center">
      <PageHeader title={`Entitlement Flow: ${entitlementFlow.id}`} backReference={backReference} />
      <NavigationTabs tabElements={tabElements} redirectState={{ from: backReference }} />
      <Outlet />
    </div>
  );
};
