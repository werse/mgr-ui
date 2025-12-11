import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { cn } from '@/lib/utils.ts';
import type { Identifiable } from '@/types/common';
import type { Key } from 'react';

export type DataTableColumnDefinition<T> = {
  title: string;
  width?: string;
  key: Key;
  show?: boolean;
  render: (item: T) => React.ReactNode;
  cellClassName?: string;
  headerClassName?: string;
};

interface Props<T extends Identifiable> {
  data: T[];
  globalKey: string;
  headerRowClassName?: string;
  numerationOffset: number;
  columnDefinitions: DataTableColumnDefinition<T>[];
}

export const EntitiesDataTable = <T extends Identifiable>({
  data,
  globalKey,
  numerationOffset = 0,
  columnDefinitions,
}: Props<T>) => {
  const extraTableCellStyle = 'pl-2 py-1 text-foreground/75';
  return (
    <div className="flex-1 p-4 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="font-semibold text-sm select-text hover:bg-transparent text-foreground/80">
            <TableCell className="w-[2%]">#</TableCell>
            {columnDefinitions
              .filter((cellDef) => (cellDef.show == null ? true : cellDef.show))
              .map((cd) => (
                <TableCell
                  key={`th-${globalKey.toLowerCase()}-${cd.title.toLowerCase()}`}
                  className={`${cd.headerClassName}`.trim()}
                >
                  {cd.title}
                </TableCell>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody key={'tbody-' + globalKey.toLowerCase()}>
          {data.map((dataRow, idx) => (
            <TableRow className="select-text odd:bg-muted/25 pt-0.5 pb-0.5" key={`${globalKey}-row-${dataRow.id}`}>
              <TableCell className={`${extraTableCellStyle} text-sm font-extralight text-foreground/25`} key="idx-cell">
                {numerationOffset + idx + 1}
              </TableCell>
              {columnDefinitions
                .filter((cellDef) => (cellDef.show == null ? true : cellDef.show))
                .map((cellDef) => (
                  <TableCell className={cn(extraTableCellStyle, cellDef.cellClassName)} key={cellDef.key}>
                    {cellDef.render(dataRow)}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
