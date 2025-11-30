import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { EntitiesDataTable } from '@/components/tables';
import type { Entitlement } from '@/types/mgr-tenant-entitlements';

interface Props {
  entitlements: Entitlement[];
  numOffset: number;
  useTenantRefs?: boolean;
  useAppRefs?: boolean;
}

export const EntitlementsTable = ({ entitlements, numOffset }: Props) => {
  return (
    <ScrollArea className="overflow-auto flex-1 p-4">
      <EntitiesDataTable
        data={entitlements}
        globalKey={'apps'}
        numerationOffset={numOffset}
        columnDefinitions={[
          {
            title: 'Application ID',
            key: 'mte-application-id',
            headerClassName: 'w-[35%]',
            render: (entitlement: Entitlement) => <span>{entitlement.applicationId || 'N/A'}</span>,
            cellClassName: 'max-w-[60ch] truncate',
          },
          {
            title: 'Tenant',
            key: 'mte-tenant-id',
            render: (entitlement: Entitlement) => <span>{entitlement.tenantName || entitlement.tenantId}</span>,
            cellClassName: 'max-w-[40ch] truncate',
          },
        ]}
      />
    </ScrollArea>
  );
};
