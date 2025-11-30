import { PageHeader } from '@/components/PageHeader/index.ts';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_OFFSET, getIntParamOrDefault } from '@/lib/utils.ts';
import { PaginationFooter } from '@/components/PaginationFooter/index.ts';
import { EntitlementFlowsTable } from '@/components/tables';
import { CqlQuery } from '@/lib/cql-query';
import { useQuery } from '@tanstack/react-query';
import { EntitlementClient } from '@/integration/clients';

export const EntitlementFlowsPage = () => {
  const [searchParams] = useSearchParams();

  const spOffset = getIntParamOrDefault(searchParams.get('offset'), DEFAULT_OFFSET);
  const offset = spOffset >= DEFAULT_OFFSET ? spOffset : DEFAULT_OFFSET;
  const limit = 25;

  const query = CqlQuery.rawQuery('cql.allRecords=1 sortBy startedAt/sort.descending').toText();
  const { isPending, data } = useQuery({
    staleTime: 0,
    queryKey: ['entitlement-flows', { query, limit, offset }],
    queryFn: () => EntitlementClient.findEntitlementFlowsByQuery(true, { flowQuery: query, limit, offset }),
  });

  if (isPending) {
    return <div className="p-6">Loading entitlement flows...</div>;
  }

  if (!data) {
    return <div className="p-6">Entitlement flows not found</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Entitlement Flows" totalRecords={data.totalRecords} />
      <EntitlementFlowsTable entitlementFlows={data.flows} idxOffset={offset} />
      <PaginationFooter totalRecords={data.totalRecords} pageLimit={limit} currentOffset={offset} />
    </div>
  );
};
