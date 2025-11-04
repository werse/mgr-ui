import { PageHeader } from '@/components/PageHeader/index.ts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { DEFAULT_OFFSET, getBackReference, getIntParamOrDefault } from '@/lib/utils.ts';
import { PaginationFooter } from '@/components/PaginationFooter/index.ts';
import { ENTITLEMENT_FLOWS_SAMPLE_DATA } from '@/pages/EntitlementFlowsPage/data.ts';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const getStatusColor = (status?: string) => {
  if (!status) {
    return 'bg-gray-400';
  }

  switch (status.toLowerCase()) {
    case 'finished':
      return 'bg-green-500';
    case 'in_progress':
      return 'bg-yellow-500 animate-pulse';
    case 'failed':
    case 'cancellation_failed':
      return 'bg-red-500';
    case 'canceled':
      return 'bg-blue-500';
    default:
      return 'bg-gray-400';
  }
};

export const EntitlementFlowsPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const data = ENTITLEMENT_FLOWS_SAMPLE_DATA;

  const spOffset = getIntParamOrDefault(searchParams.get('offset'), DEFAULT_OFFSET);
  const offset = spOffset >= DEFAULT_OFFSET ? spOffset : DEFAULT_OFFSET;
  const extraTableCellStyle = 'pl-2 pt-0.75 pb-0.75 text-foreground/75';
  const pageLimit = 25;

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Entitlement Flows" totalRecords={data.totalRecords} />
      <ScrollArea className="overflow-auto flex-1 p-4">
        <Table>
          <TableHeader>
            <TableRow className="font-semibold text-sm select-text hover:bg-transparent text-foreground/80">
              <TableCell className="w-[2%]">#</TableCell>
              <TableCell className="w-[2%]"></TableCell>
              <TableCell className="w-[6%]">Type</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Tenant Id</TableCell>
              <TableCell className="w-[15%]"> Start Time</TableCell>
              <TableCell className="w-[15%]">End Time</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.flows.map((flow, idx) => (
              <TableRow key={flow.id} className="select-text odd:bg-muted/25 pt-0.5 pb-0.5">
                <TableCell className={`${extraTableCellStyle} text-sm font-extralight text-foreground/25`}>
                  {offset + idx + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Tooltip delayDuration={150}>
                      <TooltipTrigger asChild>
                        <span
                          aria-hidden
                          className={`inline-block w-4 h-4 rounded-[5px] mr-3 ${getStatusColor(flow.status)}`}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>{flow.status}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className="uppercase">{flow.type}</TableCell>
                <TableCell className={`${extraTableCellStyle} max-w-[45ch] truncate`}>
                  <Link
                    to={`/entitlements/entitlement-flows/${flow.id}/stages`}
                    state={getBackReference(location)}
                    className="hover:underline"
                  >
                    {flow.id}
                  </Link>
                </TableCell>
                <TableCell className={`${extraTableCellStyle} max-w-[45ch] truncate`}>
                  <Link
                    to={`/tenants/${flow.tenantId}/details`}
                    state={getBackReference(location)}
                    className="hover:underline"
                  >
                    {flow.tenantId}
                  </Link>
                </TableCell>
                <TableCell className={`${extraTableCellStyle} max-w-[20ch] truncate`}>{flow.startedAt}</TableCell>
                <TableCell className={`${extraTableCellStyle} max-w-[20ch] truncate`}>{flow.finishedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <PaginationFooter totalRecords={data.totalRecords} pageLimit={pageLimit} currentOffset={offset} />
    </div>
  );
};
