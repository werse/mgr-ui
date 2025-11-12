import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { cn } from '@/lib/utils.ts';

export type DataTableColumnDefinition<T, K extends PropertyKey> = {
  title: string;
  width?: string;
  key: K;
  render: (item: T, columnKey: K) => React.ReactNode;
  cellClassName?: string;
  headerClassName?: string;
};

interface Props<T> {
  data: T[];
  globalKey: string;
  headerRowClassName?: string;
  numerationOffset: number;
  columnDefinitions: DataTableColumnDefinition<T, PropertyKey>[];
}

export const AppDataTable = <T,>({ data, globalKey, numerationOffset = 0, columnDefinitions }: Props<T>) => {
  function getKey(idx: number, columnDefinition: DataTableColumnDefinition<T, PropertyKey>) {
    return `tr-${globalKey.toLowerCase()}-${idx + numerationOffset}-${String(columnDefinition.key).toLowerCase()}`;
  }


  const extraTableCellStyle = 'pl-2 py-1 text-foreground/75';
  return (
    <Table>
      <TableHeader>
        <TableRow className="font-semibold text-sm select-text hover:bg-transparent text-foreground/80">
          <TableCell className="w-[3%]">#</TableCell>
          {columnDefinitions.map((cd) => (
            <TableCell
              key={`th-${globalKey.toLowerCase()}-${cd.title.toLowerCase()}`}
              className={`${cd.headerClassName}`.trim()}
            >
              {cd.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((dataRow, idx) => (
          <TableRow className="select-text odd:bg-muted/25 pt-0.5 pb-0.5">
            <TableCell
              key={`tr-${globalKey.toLowerCase()}-${idx + numerationOffset}-idx`}
              className={`${extraTableCellStyle} text-sm font-extralight text-foreground/25`}
            >
              {numerationOffset + idx + 1}
            </TableCell>
            {columnDefinitions.map((cd) => (
              <TableCell key={getKey(idx, cd)} className={cn(extraTableCellStyle, cd.cellClassName)}>
                {cd.render(dataRow, cd.key)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
