import { useQuery } from '@tanstack/react-query';
import type { Tenant } from '@/types/tenant';
import { TenantClient } from '@/integration/clients';
import { Spinner } from '@/components/ui/spinner.tsx';
import { useParams } from 'react-router-dom';
import { EntityDetails } from '@/components/EntityDetails';

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

  const entityDetails = {
    id: tenant.id,
    name: tenant.name,
    description: tenant.description,
    type: tenant.type,
    secure: tenant.secure || false,
    createdBy: tenant.metadata?.createdBy || 'N/A',
    createdDate: tenant.metadata?.createdDate || 'N/A',
    modifiedBy: tenant.metadata?.modifiedBy || 'N/A',
    modifiedDate: tenant.metadata?.modifiedDate || 'N/A',
  };

  return <EntityDetails entity={entityDetails} />;
};
