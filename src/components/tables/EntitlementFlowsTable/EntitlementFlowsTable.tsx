import { EntitiesDataTable } from '@/components/tables';
import { FlowIndicator } from '@/components/FlowIndication';
import { TableLink } from '@/components/TableLink';
import { entitlementFlowDetailsRef, tenantDetailsRef } from '@/lib/links.tsx';
import type { EntitlementFlow } from '@/types/mgr-tenant-entitlements/flow';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

interface Props {
  entitlementFlows: EntitlementFlow[];
  idxOffset?: number;
}
export const EntitlementFlowsTable = ({ entitlementFlows, idxOffset }: Props) => {
  return (
    <ScrollArea className="overflow-auto flex-1 p-4">
      <EntitiesDataTable
        data={entitlementFlows}
        globalKey={'flows'}
        numerationOffset={idxOffset || 0}
        columnDefinitions={[
          {
            title: '',
            key: 'grade',
            headerClassName: 'w-[2%]',
            render: (flow) => <FlowIndicator status={flow.status} />,
          },
          {
            title: 'Type',
            key: 'type',
            headerClassName: 'w-[6%]',
            cellClassName: 'uppercase',
            render: (flow) => <span>{flow.type}</span>,
          },
          {
            title: 'Id',
            key: 'id',
            render: (f) => <TableLink to={entitlementFlowDetailsRef(f.id)} title={f.id} />,
          },
          {
            title: 'Tenant Name',
            key: 'tenant-name',
            render: (f) => <TableLink to={tenantDetailsRef(f.tenantId)} title={f.tenantName || f.tenantId} />,
          },
          {
            title: 'Start Time',
            key: 'startedAt',
            headerClassName: 'w-[18%]',
            cellClassName: 'max-w-[20ch] truncate',
            render: (flow: EntitlementFlow) => <span>{flow.startedAt}</span>,
          },
          {
            title: 'End Time',
            key: 'finishedAt',
            headerClassName: 'w-[18%]',
            cellClassName: 'max-w-[20ch] truncate',
            render: (flow: EntitlementFlow) => <span>{flow.finishedAt}</span>,
          },
        ]}
      />
    </ScrollArea>
  );
};
