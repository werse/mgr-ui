import { EntitiesDataTable } from '@/components/tables';
import { FlowIndicator } from '@/components/FlowIndication';
import { TableLink } from '@/components/TableLink';
import { applicationDetailsRef, applicationFlowDetailsRef, tenantDetailsRef } from '@/lib/links.tsx';
import type { ApplicationFlow } from '@/types/mgr-tenant-entitlements/flow';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

interface Props {
  applicationFlows: ApplicationFlow[];
}

export const ApplicationFlowsTable = ({ applicationFlows }: Props) => {
  return (
    <ScrollArea className="overflow-auto flex-1 p-4">
      <EntitiesDataTable
        data={applicationFlows}
        globalKey={'flows'}
        numerationOffset={0}
        columnDefinitions={[
          {
            title: '',
            key: 'grade',
            headerClassName: 'w-[1%]',
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
            render: (f) => <TableLink to={applicationFlowDetailsRef(f.id)} title={f.id} />,
          },
          {
            title: 'Application Id',
            key: 'app-id',
            render: (f) => <TableLink to={applicationDetailsRef(f.applicationId)} title={f.applicationId} />,
          },
          {
            title: 'Tenant',
            key: 'tenant',
            render: (f) => <TableLink to={tenantDetailsRef(f.tenantId)} title={f.tenantName || f.tenantId} />,
          },
          {
            title: 'Start Time',
            key: 'startedAt',
            headerClassName: 'w-[18%]',
            cellClassName: 'max-w-[20ch] truncate',
            render: (f) => <span>{f.startedAt}</span>,
          },
          {
            title: 'End Time',
            key: 'finishedAt',
            headerClassName: 'w-[18%]',
            cellClassName: 'max-w-[20ch] truncate',
            render: (f) => <span>{f.finishedAt}</span>,
          },
        ]}
      />
    </ScrollArea>
  );
};
