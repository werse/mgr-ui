import { EntitiesDataTable } from '@/components/tables';
import type { Tenant } from '@/types/tenant';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TableLink } from '@/components/TableLink';
import { tenantDetailsRef } from '@/lib/links';

interface Props {
  tenants: Tenant[];
  offset: number;
}

export const TenantsTable = ({ tenants, offset }: Props) => {
  return (
    <ScrollArea className="overflow-auto flex-1 p-4">
      <EntitiesDataTable
        data={tenants}
        globalKey={'tenants'}
        numerationOffset={offset}
        columnDefinitions={[
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
    </ScrollArea>
  );
};
