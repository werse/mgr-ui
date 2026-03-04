import { TenantClient } from '@/integration/clients';
import { Spinner } from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import type { Tenant } from '@/types/tenant';
import { Outlet, useParams } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { type NavigationTabDef, NavigationTabs } from '@/components/NavigationTabs';

export const TenantPage = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const { isPending, data: tenant } = useQuery<Tenant>({
    queryKey: ['tenant-by-id', tenantId],
    queryFn: () => TenantClient.getById(tenantId!),
  });

  if (isPending) {
    return (
      <div className="p-6">
        <Spinner className="size-8" />
        <span>Loading tenants</span>
      </div>
    );
  }

  if (!tenant) {
    return <div className="p-6">Tenant not found</div>;
  }

  const tabElements: NavigationTabDef[] = [
    {
      title: 'Details',
      key: 'tenant-page-details',
      to: `/tenants/${tenantId}/details`,
    },
    {
      title: 'Attributes',
      key: 'tenant-page-attributes',
      to: `/tenants/${tenantId}/attributes`,
    },
    {
      title: 'Entitlements',
      key: 'tenant-page-entitlements',
      to: `/tenants/${tenantId}/entitlements`,
    },
    {
      title: 'Entitlement Flows',
      key: 'tenant-page-entitlement-flows',
      to: `/tenants/${tenantId}/entitlement-flows`,
    },
    {
      title: 'Application Flows',
      key: 'tenant-page-application-flows',
      to: `/tenants/${tenantId}/application-flows`,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader title={`Tenant: ${tenant.name}`} />
      <NavigationTabs tabElements={tabElements} />
      <div className={'flex-1 min-h-0 flex overflow-hidden'}>
        <Outlet />
      </div>
    </div>
  );
};
