import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table.tsx';
import { AnyValuePrinter } from '@/components/AnyValuePrinter';
import { useQuery } from '@tanstack/react-query';
import type { Tenant } from '@/types/tenant';
import { TenantClient } from '@/integration/clients';
import { Spinner } from '@/components/ui/spinner.tsx';
import { useParams } from 'react-router-dom';

export const TenantDetailsPage = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const { isPending, data: tenant } = useQuery<Tenant>({
    queryKey: ['tenant-by-id', tenantId],
    queryFn: () => TenantClient.getById(tenantId!),
  });

  if (isPending) {
    return (
      <div className="p-6">
        <Spinner className="size-8" />
        <span>Loading tenants</span>
      </div>
    );
  }

  if (!tenant) {
    return <div className="p-6">Tenant not found</div>;
  }

  return (
    <div className="p-4 flex flex-col w-full h-full">
      <Table>
        <TableBody className={'select-text'}>
          {Object.entries(tenant).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="min-w-2/8 p-2 pl-4 pt-4 font-semibold align-top">{key}</TableCell>
              <TableCell className="w-6/8 p-2 pt-4 align-top whitespace-break-spaces">
                <AnyValuePrinter value={value} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
