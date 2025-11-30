import type { SidebarLayout } from '@/config/types';

export const NAVIGATION_LAYOUT: SidebarLayout = {
  navMain: [
    {
      title: 'Tenants',
      url: '/tenants',
      icon: 'library',
      items: [
        {
          title: 'Tenants',
          url: '/tenants',
          icon: 'library',
        },
      ],
    },
    {
      title: 'Applications',
      url: '/applications',
      icon: 'layout-panel-left',
      items: [
        {
          title: 'Applications',
          url: '/applications',
          icon: 'layout-panel-left',
        },
        {
          title: 'Application Builder',
          url: '/application-builder',
          icon: 'wrench',
        },
      ],
    },
    {
      title: 'Tenant Entitlements',
      url: '/entitlements',
      icon: 'box',
      items: [
        {
          title: 'Entitlements',
          url: '/entitlements',
          icon: 'box',
        },
        {
          title: 'Entitlement Flows',
          url: '/entitlement-flows',
          icon: 'workflow',
        },
        {
          title: 'Application Flows',
          url: '/application-flows',
          icon: 'workflow',
        },
      ],
    },
    {
      title: 'Modules',
      url: '/modules',
      icon: 'puzzle',
      items: [
        {
          title: 'Registry',
          url: '/module-registry',
          icon: 'puzzle',
        },
        {
          title: 'Discovery',
          url: '/module-discovery',
          icon: 'telescope',
        }
      ],
    },
  ],
};
