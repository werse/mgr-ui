import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table.tsx';
import type { Identifiable } from '@/types/common';
import type { Key } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

export type EntityDetailsRowDef<T> = {
  key: Key;
  title: string;
  render: (item: T) => React.ReactNode;
};

interface Props<T extends Identifiable> {
  entity: T;
  renderMap: EntityDetailsRowDef<T>[];
}

export const EntityDetails = <T extends Identifiable>({ entity, renderMap }: Props<T>) => {
  return (
    <ScrollArea className="flex-1 p-4 overflow-auto">
      <div className="p-4 flex flex-col">
        <Table>
          <TableBody className={'select-text'}>
            {renderMap.map((rowDef) => (
              <TableRow key={rowDef.key} className="even:bg-muted/25">
                <TableCell className="min-w-3/16 p-2 pl-4 py-3 font-semibold align-top">{rowDef.title}</TableCell>
                <TableCell className="p-2 py-3 align-top whitespace-break-spaces">{rowDef.render(entity)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
};
