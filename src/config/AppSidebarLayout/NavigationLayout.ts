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
          icon: 'library',
          url: '',
        },
        {
          title: 'Configuration',
          url: '/configuration',
          icon: 'cog'
        },
      ],
    },
    {
      title: 'Applications',
      url: '/applications',
      icon: 'app-window-mac',
      items: [
        {
          title: 'Applications',
          url: '',
          icon: 'app-window-mac',
        },
        {
          title: 'Configuration',
          url: '/configuration',
          icon: 'cog'
        },
        {
          title: 'Application Builder',
          url: '/application-builder',
          icon: 'wrench'
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
          url: '',
          icon: 'box',
        },
        {
          title: 'Entitlement Flows',
          url: '/entitlement-flows',
          icon: 'workflow'
        },
        {
          title: 'Application Flows',
          url: '/application-flows',
          icon: 'workflow'
        },
        {
          title: 'Configuration',
          url: '/configuration',
          icon: 'cog'
        },
      ],
    },
    {
      title: 'Deployments',
      url: '/deployments',
      icon: 'layers',
      items: [
        {
          title: 'Deployments',
          url: '',
          icon: 'layers',
        },
        {
          title: 'Deployment Requests',
          url: '/requests',
          icon: 'radio'
        },
        {
          title: 'Configuration',
          url: '/configuration',
          icon: 'cog'
        },
      ],
    },
  ],
};
