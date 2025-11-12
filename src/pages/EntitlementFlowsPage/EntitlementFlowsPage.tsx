import { PageHeader } from '@/components/PageHeader/index.ts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { DEFAULT_OFFSET, getBackReference, getIntParamOrDefault } from '@/lib/utils.ts';
import { PaginationFooter } from '@/components/PaginationFooter/index.ts';
import { ENTITLEMENT_FLOWS_SAMPLE_DATA } from '@/pages/EntitlementFlowsPage/data.ts';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AppDataTable } from '@/components/AppDataTable';
import type { EntitlementFlow } from '@/types/mgr-tenant-entitlements/flow';

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
  const pageLimit = 25;

  const renderFlowIdCellValue = (flow: EntitlementFlow) => (
    <Link
      to={`/entitlements/entitlement-flows/${flow.id}/stages`}
      state={getBackReference(location)}
      className="hover:underline"
    >
      <span>{flow.id}</span>
    </Link>
  );

  const renderFlowTenantIdCellValue = (flow: EntitlementFlow) => (
    <Link
      to={`/entitlements/entitlement-flows/${flow.id}/stages`}
      state={getBackReference(location)}
      className="hover:underline"
    >
      <span>{flow.id}</span>
    </Link>
  );

  const renderFlowIndicator = (flow: EntitlementFlow) => (
    <div className="flex items-center">
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <span aria-hidden className={`inline-block w-4 h-4 rounded-full mr-3 ${getStatusColor(flow.status)}`} />
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{flow.status}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Entitlement Flows" totalRecords={data.totalRecords} />
      <ScrollArea className="overflow-auto flex-1 p-4">
        <AppDataTable
          data={data.flows}
          globalKey={'flows'}
          numerationOffset={0}
          columnDefinitions={[
            {
              title: '',
              key: 'grade',
              headerClassName: 'w-[2%]',
              render: renderFlowIndicator,
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
              render: renderFlowIdCellValue,
            },
            {
              title: 'Tenant Id',
              key: 'tenant-id',
              render: renderFlowTenantIdCellValue,
            },
            {
              title: 'Start Time',
              key: 'startedAt',
              headerClassName: 'w-[18%]',
              cellClassName: 'max-w-[20ch] truncate',
              render: (flow: EntitlementFlow) => <span>{flow.startedAt}</span>,
            },
            {
              title: 'End Time',
              key: 'finishedAt',
              headerClassName: 'w-[18%]',
              cellClassName: 'max-w-[20ch] truncate',
              render: (flow: EntitlementFlow) => <span>{flow.finishedAt}</span>,
            },
          ]}
        />
      </ScrollArea>
      <PaginationFooter totalRecords={data.totalRecords} pageLimit={pageLimit} currentOffset={offset} />
    </div>
  );
};
