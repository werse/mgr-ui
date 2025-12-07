import { TenantClient } from '@/integration/clients/TenantClient';
import { GenericListPage } from '@/pages/common/GenericListPage';
import { TableLink } from '@/components/TableLink';
import { tenantDetailsRef } from '@/lib/links.tsx';
import type { Tenant } from '@/types/tenant';

export const TenantsPage = () => {
  return (
    <GenericListPage
      title="Tenants"
      rootQueryKey="tenants"
      dataFetcher={(params) => TenantClient.findByQuery(params)}
      dataExtractor={(resp) => ({data: resp.tenants, totalRecords: resp.totalRecords})}
      showCreateButton={true}
      shouldShowHeader={(location) => location.pathname.startsWith('/tenants')}
      tableColumnDefinitions={[
        {
          title: 'Name',
          key: 'tenant-name',
          headerClassName: 'w-[25%]',
          render: (tenant) => <TableLink to={tenantDetailsRef(tenant.id)} title={tenant.name} />,
          cellClassName: 'max-w-[20ch] truncate',
        },
        {
          title: 'Description',
          key: 'tenant-description',
          render: (tenant: Tenant) => <span>{tenant.description || 'N/A'}</span>,
          cellClassName: 'max-w-[40ch] truncate',
        },
      ]}
    />
  );
};
