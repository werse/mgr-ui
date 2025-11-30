import type { ModuleDescriptor } from '@/types/mgr-applications';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { EntitiesDataTable } from '@/components/tables';

interface Props {
  modules: ModuleDescriptor[];
  idxOffset?: number;
}
export const ModulesTable = ({ modules, idxOffset }: Props) => {
  return (
    <ScrollArea className="overflow-auto flex-1 p-4">
      <EntitiesDataTable
        data={modules}
        globalKey={'apps'}
        numerationOffset={idxOffset || 0}
        columnDefinitions={[
          {
            title: 'Application ID',
            key: 'mte-application-id',
            headerClassName: 'w-[35%]',
            render: (md) => <span>{md.name || 'N/A'}</span>,
            cellClassName: 'max-w-[60ch] truncate',
          },
        ]}
      />
    </ScrollArea>
  );
};
