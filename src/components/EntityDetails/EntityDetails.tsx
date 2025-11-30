import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table.tsx';
import { AnyValuePrinter } from '@/components/AnyValuePrinter';

interface Props {
  entity: Record<string, unknown>;
}

export const EntityDetails = ({ entity }: Props) => {
  return (
    <div className="p-4 flex flex-col w-full h-full">
      <Table>
        <TableBody className={'select-text'}>
          {Object.entries(entity).map(([key, value]) => (
            <TableRow key={key} className="even:bg-muted/25">
              <TableCell className="min-w-3/16 p-2 pl-4 pt-4 font-semibold align-top">{key}</TableCell>
              <TableCell className="p-2 pt-4 align-top whitespace-break-spaces">
                <AnyValuePrinter value={value} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
