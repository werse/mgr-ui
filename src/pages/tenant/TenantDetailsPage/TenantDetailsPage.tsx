import { useQuery } from '@tanstack/react-query';
import type { Tenant } from '@/types/tenant';
import { TenantClient } from '@/integration/clients';
import { Spinner } from '@/components/ui/spinner';
import { useParams } from 'react-router-dom';
import { EntityDetails } from '@/components/EntityDetails';
import { Badge } from '@/components/ui/badge';

export const TenantDetailsPage = () => {
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

  return (
    <EntityDetails
      entity={tenant}
      renderMap={[
        {
          key: 'tenant-id',
          title: 'ID',
          render: (tenant) => <span>{tenant.id}</span>,
        },
        {
          key: 'tenant-name',
          title: 'Name',
          render: (tenant) => <span>{tenant.name}</span>,
        },
        {
          key: 'tenant-description',
          title: 'Description',
          render: (tenant) => <span>{tenant.description}</span>,
        },
        {
          key: 'tenant-type',
          title: 'Type',
          render: (tenant) => <span>{tenant.type}</span>,
        },
        {
          key: 'tenant-secure',
          title: 'Secure',
          render: (tenant) => <Badge variant="secondary"><span>{tenant.secure ? String(tenant.secure) : 'false'}</span></Badge>,
        },
        {
          key: 'tenant-createdBy',
          title: 'Created By',
          render: (tenant) => <span>{tenant.metadata?.createdBy || 'N/A'}</span>,
        },
        {
          key: 'tenant-createdDate',
          title: 'Created Date',
          render: (tenant) => <span>{tenant.metadata?.createdDate || 'N/A'}</span>,
        },
        {
          key: 'tenant-modifiedBy',
          title: 'Modified By',
          render: (tenant) => <span>{tenant.metadata?.modifiedBy || 'N/A'}</span>,
        },
        {
          key: 'tenant-modifiedDate',
          title: 'Modified Date',
          render: (tenant) => <span>{tenant.metadata?.modifiedDate || 'N/A'}</span>,
        },
      ]}
    />
  );
};
