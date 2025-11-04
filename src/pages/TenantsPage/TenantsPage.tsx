import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { TenantClient } from '@/integration/tenant-client/TenantClient';
import { useQuery } from '@tanstack/react-query';
import { CqlQuery } from '@/lib/cql-query';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { DEFAULT_OFFSET, getBackReference, getIntParamOrDefault } from '@/lib/utils.ts';
import { PaginationFooter } from '@/components/PaginationFooter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button.tsx';
import { DynamicIcon } from 'lucide-react/dynamic';
import { PageHeader } from '@/components/PageHeader';

export const TenantsPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const pageLimit = 50;

  const spOffset = getIntParamOrDefault(searchParams.get('offset'), DEFAULT_OFFSET);
  const offset = spOffset >= DEFAULT_OFFSET ? spOffset : DEFAULT_OFFSET;

  const query = CqlQuery.matchAll();
  const { isPending, data } = useQuery({
    queryKey: ['tenants', { query, limit: pageLimit, offset }],
    queryFn: () => TenantClient.findByQuery({ query, limit: pageLimit, offset }),
  });

  if (isPending) {
    return <div className="p-6">Loading tenants...</div>;
  }

  if (!data) {
    return <div className="p-6">Tenants not found</div>;
  }

  const extraTableCellStyle = 'pl-2 pt-0.75 pb-0.75 text-foreground/75';

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Tenants" totalRecords={data.totalRecords}>
        <div className="ml-auto flex justify-items-end items-center mr-1">
          <Button size={"sm"} variant={"default"}>
            <DynamicIcon name="plus" />
            <span>Create</span>
          </Button>
        </div>
      </PageHeader>
      <ScrollArea className="overflow-auto flex-1 p-4">
        <Table>
          <TableHeader>
            <TableRow className="font-semibold text-sm select-text hover:bg-transparent text-foreground/80">
              <TableCell className="w-1/40">#</TableCell>
              <TableCell className="w-2/8">Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.tenants.map((tenant, idx) => (
              <TableRow key={tenant.id} className="select-text odd:bg-muted/25 pt-0.5 pb-0.5">
                <TableCell className={`${extraTableCellStyle} text-sm font-extralight text-foreground/25`}>
                  {offset + idx + 1}
                </TableCell>
                <TableCell className={`${extraTableCellStyle} max-w-[20ch] truncate`}>
                  <Link
                    to={`/tenants/${tenant.id}/details`}
                    state={getBackReference(location)}
                    className="hover:underline"
                  >
                    {tenant.name}
                  </Link>
                </TableCell>
                <TableCell className={`${extraTableCellStyle} max-w-[40ch] truncate`}>
                  {tenant.description || 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <PaginationFooter totalRecords={data.totalRecords} pageLimit={pageLimit} currentOffset={offset} />
    </div>
  );
};
