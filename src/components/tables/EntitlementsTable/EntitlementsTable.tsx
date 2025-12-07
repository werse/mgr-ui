import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { EntitiesDataTable } from '@/components/tables';
import type { Entitlement } from '@/types/mgr-tenant-entitlements';
import { TableLink } from '@/components/TableLink';
import { applicationDetailsRef, tenantDetailsRef } from '@/lib/links.tsx';

interface Props {
  entitlements: Entitlement[];
  idxOffset?: number;
  useTenantRefs?: boolean;
  useAppRefs?: boolean;
}

export const EntitlementsTable = ({ entitlements, idxOffset }: Props) => {
  return (
    <ScrollArea className="overflow-auto flex-1 p-4">
      <EntitiesDataTable
        data={entitlements}
        globalKey={'entitlements'}
        numerationOffset={idxOffset || 0}
        columnDefinitions={[
          {
            title: 'Application ID',
            key: 'mte-application-id',
            headerClassName: 'w-[35%]',
            render: (e) => <TableLink to={applicationDetailsRef(e.applicationId)} title={e.applicationId} />,
            cellClassName: 'max-w-[60ch] truncate',
          },
          {
            title: 'Tenant Name',
            key: 'mte-tenant-id',
            render: (e) => <TableLink to={tenantDetailsRef(e.tenantId)} title={e.tenantName || e.tenantId} />,
            cellClassName: 'max-w-[40ch] truncate',
          },
        ]}
      />
    </ScrollArea>
  );
};
