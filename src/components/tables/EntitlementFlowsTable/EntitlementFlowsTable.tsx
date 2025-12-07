import { EntitiesDataTable } from '@/components/tables';
import { FlowIndicator } from '@/components/FlowIndication';
import { TableLink } from '@/components/TableLink';
import { entitlementFlowDetailsRef, tenantDetailsRef } from '@/lib/links.tsx';
import type { EntitlementFlow } from '@/types/mgr-tenant-entitlements/flow';

interface Props {
  entitlementFlows: EntitlementFlow[];
  idxOffset?: number;
}
export const EntitlementFlowsTable = ({ entitlementFlows, idxOffset }: Props) => {
  return (
    <EntitiesDataTable
      data={entitlementFlows}
      globalKey={'flows'}
      numerationOffset={idxOffset || 0}
      columnDefinitions={[
        {
          title: '',
          key: 'grade',
          headerClassName: 'w-[2%]',
          render: (f) => <FlowIndicator status={f.status} />,
        },
        {
          title: 'Type',
          key: 'type',
          headerClassName: 'w-[10%]',
          cellClassName: 'uppercase',
          render: (f) => <TableLink to={entitlementFlowDetailsRef(f.id)} title={f.type} />,
        },
        {
          title: 'Tenant Name',
          key: 'tenant-name',
          render: (f) => <TableLink to={tenantDetailsRef(f.tenantId)} title={f.tenantName || f.tenantId} />,
        },
        {
          title: 'Start Time',
          key: 'startedAt',
          headerClassName: 'w-[25%]',
          cellClassName: 'max-w-[10ch] truncate',
          render: (f) => <span>{f.startedAt}</span>,
        },
        {
          title: 'End Time',
          key: 'finishedAt',
          headerClassName: 'w-[25%]',
          cellClassName: 'max-w-[10ch] truncate',
          render: (f) => <span>{f.finishedAt}</span>,
        },
      ]}
    />
  );
};
