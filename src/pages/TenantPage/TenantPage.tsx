import { TenantClient } from '@/integration/tenant-client';
import { Spinner } from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import type { Tenant } from '@/types/tenant';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { type NavigationTabDef, NavigationTabs } from '@/components/NavigationTabs';

export const TenantPage = () => {
  const location = useLocation();
  const backReference = location.state && location.state.from;
  const { tenantId } = useParams<{ tenantId: string }>();
  const { isPending, data: tenant } = useQuery<Tenant>({
    queryKey: ['tenant-by-id', tenantId],
    queryFn: () => TenantClient.getTenantById(tenantId!),
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
      title: 'Entitlements',
      key: 'tenant-page-entitlements',
      to: `/tenants/${tenantId}/entitlements`,
    },
    {
      title: 'Entitlement Flows',
      key: 'tenant-page-entitlement-flows',
      to: `/tenants/${tenantId}/entitlement-flows`,
    },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <PageHeader title={tenant.name} backReference={backReference} />
      <NavigationTabs tabElements={tabElements} redirectState={{ from: backReference }} />
      <div className={'h-full flex'}>
        <Outlet />
      </div>
    </div>
  );
};
