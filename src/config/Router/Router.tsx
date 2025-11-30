import { createBrowserRouter } from 'react-router-dom';
import { HomePage, NotFoundPage, RootPage } from '@/pages/common';
import { TenantDetailsPage, TenantPage, TenantsPage } from '@/pages/tenant';
import { ApplicationDetailsPage, ApplicationPage, ApplicationsPage } from '@/pages/application';
import {
  ApplicationFlowsPage,
  EntitlementFlowDetailsPage,
  EntitlementFlowPage,
  EntitlementFlowsPage,
  EntitlementsPage,
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
        path: 'applications/:applicationId',
        Component: ApplicationPage,
        children: [
          {
            path: 'details',
            Component: ApplicationDetailsPage,
          },
          {
            path: '',
            Component: ApplicationDetailsPage,
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
        path: '/modules/registry',
        Component: ModuleRegistryPage,
      },
      {
        path: '/modules/discovery',
        Component: ModulesDiscoveryPage,
      },
      {
        path: 'entitlement-flows/:flowId',
        Component: EntitlementFlowPage,
        children: [
          {
            path: '',
            Component: EntitlementFlowDetailsPage,
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
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
