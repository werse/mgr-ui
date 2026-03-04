import {createBrowserRouter, Navigate} from 'react-router-dom';
import { HomePage, NotFoundPage, RootPage } from '@/pages/common';
import {
  TenantApplicationFlowsPage,
  TenantAttributesPage,
  TenantDetailsPage,
  TenantEntitlementFlowsPage,
  TenantEntitlementsPage,
  TenantPage,
  TenantsPage,
} from '@/pages/tenant';
import { ApplicationDetailsPage, ApplicationPage, ApplicationsPage } from '@/pages/application';
import {
  ApplicationFlowDetailsPage,
  ApplicationFlowPage,
  ApplicationFlowsPage,
  EntitlementFlowDetailsPage,
  EntitlementFlowPage,
  EntitlementFlowsPage,
  EntitlementsPage,
  FlowStagesPage,
} from '@/pages/entitlement';
import { ModuleRegistryPage, ModulesDiscoveryPage } from '@/pages/module';

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
        path: 'tenants/:tenantId',
        Component: TenantPage,
        children: [
          {
            path: '',
            element: <Navigate to='details' replace />,
          },
          {
            path: 'details',
            Component: TenantDetailsPage,
          },
          {
            path: 'attributes',
            Component: TenantAttributesPage,
          },
          {
            path: 'entitlements',
            Component: TenantEntitlementsPage,
          },
          {
            path: 'entitlement-flows',
            Component: TenantEntitlementFlowsPage,
          },
          {
            path: 'application-flows',
            Component: TenantApplicationFlowsPage,
          },
        ],
      },
      {
        path: 'applications',
        Component: ApplicationsPage,
      },
      {
        path: 'applications/:applicationId',
        Component: ApplicationPage,
        children: [
          {
            path: '',
            element: <Navigate to='details' replace />,
          },
          {
            path: 'details',
            Component: ApplicationDetailsPage,
          },
          {
            path: 'entitlements',
            Component: EntitlementsPage,
          },
          {
            path: 'flows',
            Component: ApplicationFlowsPage,
          },
        ],
      },
      {
        path: 'entitlements',
        Component: EntitlementsPage,
      },
      {
        path: 'entitlement-flows',
        Component: EntitlementFlowsPage,
      },
      {
        path: 'entitlement-flows/:flowId',
        Component: EntitlementFlowPage,
        children: [
          {
            path: '',
            element: <Navigate to='details' replace />,
          },
          {
            path: 'details',
            Component: EntitlementFlowDetailsPage,
          },
          {
            path: 'application-flows',
            Component: ApplicationFlowsPage,
          },
        ],
      },
      {
        path: 'application-flows',
        Component: ApplicationFlowsPage,
      },
      {
        path: 'application-flows/:applicationFlowId',
        Component: ApplicationFlowPage,
        children: [
          {
            path: '',
            element: <Navigate to='details' replace />,
          },
          {
            path: 'details',
            Component: ApplicationFlowDetailsPage,
          },
          {
            path: 'stages',
            Component: FlowStagesPage,
          },
        ],
      },
      {
        path: 'module-registry',
        Component: ModuleRegistryPage,
      },
      {
        path: 'module-discovery',
        Component: ModulesDiscoveryPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
