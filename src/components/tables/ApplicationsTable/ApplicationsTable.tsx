import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { TableLink } from '@/components/TableLink';
import { applicationDetailsRef } from '@/lib/links.tsx';
import { EntitiesDataTable } from '@/components/tables';
import type { AppDescriptor } from '@/types/mgr-applications';

interface Props {
  applications: AppDescriptor[];
  idxOffset?: number;
}
export const ApplicationsTable = ({ applications, idxOffset }: Props) => {
  return (
    <ScrollArea className="overflow-auto flex-1 p-4">
      <EntitiesDataTable
        data={applications}
        globalKey={'apps'}
        numerationOffset={idxOffset || 0}
        columnDefinitions={[
          {
            title: 'Name',
            key: 'name',
            render: (app) => <TableLink to={applicationDetailsRef(app.id)} title={app.id} />,
            cellClassName: 'max-w-[60ch] truncate',
          },
          {
            title: 'Description',
            key: 'description',
            render: (app) => <span>{app.description || 'N/A'}</span>,
            cellClassName: 'max-w-[40ch] truncate',
          },
        ]}
      />
    </ScrollArea>
  );
};
