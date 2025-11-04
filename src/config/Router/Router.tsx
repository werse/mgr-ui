import { createBrowserRouter } from 'react-router-dom';
import { TenantsPage } from '@/pages/TenantsPage';
import { ApplicationsPage } from '@/pages/Applications';
import { RootPage } from '@/pages/RootPage';
import { NotFoundPage } from '@/pages/NotFound';
import { EntitlementsPage } from '@/pages/EntitlementsPage';
import { HomePage } from '@/pages/HomePage/HomePage.tsx';
import { TenantPage } from '@/pages/TenantPage';
import { TenantDetailsPage } from '@/pages/TenantDetailsPage';
import { EntitlementFlowsPage } from '@/pages/EntitlementFlowsPage/EntitlementFlowsPage.tsx';
import { EntitlementFlowPage } from '@/pages/EntitlementFlowPage';
import { FlowStagesPage } from '@/pages/FlowStages/FlowStagesPage.tsx';

export const ROUTER = createBrowserRouter([
  {
    path: '/',
    Component: RootPage,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'tenants',
        Component: TenantsPage,
      },
      {
        path: 'tenants/configuration',
        Component: NotFoundPage,
      },
      {
        path: 'tenants/:tenantId',
        Component: TenantPage,
        children: [
          {
            path: 'details',
            Component: TenantDetailsPage,
          },
          {
            path: '',
            Component: TenantDetailsPage,
          },
          {
            path: 'entitlements',
            Component: NotFoundPage,
          },
          {
            path: 'entitlement-flows',
            Component: NotFoundPage,
          },
        ],
      },
      {
        path: 'applications',
        Component: ApplicationsPage,
      },
      {
        path: 'entitlements',
        Component: EntitlementsPage,
      },
      {
        path: 'entitlements/entitlement-flows',
        Component: EntitlementFlowsPage,
      },
      {
        path: 'entitlements/entitlement-flows/:flowId',
        Component: EntitlementFlowPage,
        children:[
          {
            path: '',
            Component: FlowStagesPage
          },
          {
            path: 'stages',
            Component: FlowStagesPage
          }
        ]
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
