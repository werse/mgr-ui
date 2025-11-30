import { createBrowserRouter } from 'react-router-dom';
import { HomePage, NotFoundPage, RootPage } from '@/pages/common';
import {
  TenantAttributesPage,
  TenantDetailsPage,
  TenantEntitlementFlowsPage,
  TenantEntitlementsPage,
  TenantPage,
  TenantsPage,
} from '@/pages/tenant';
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
            path: '',
            Component: TenantDetailsPage,
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
            Component: ApplicationDetailsPage,
          },
          {
            path: 'details',
            Component: ApplicationDetailsPage,
          },
          {
            path: 'entitlements',
            Component: TenantEntitlementsPage,
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
        path: 'application-flows',
        Component: ApplicationFlowsPage,
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
