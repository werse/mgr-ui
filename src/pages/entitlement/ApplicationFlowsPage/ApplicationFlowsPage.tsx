import { useSearchParams } from 'react-router-dom';
import { DEFAULT_OFFSET, getIntParamOrDefault } from '@/lib/utils.ts';
import { CqlQuery } from '@/lib/cql-query';
import { useQuery } from '@tanstack/react-query';
import { EntitlementClient } from '@/integration/clients';
import { PageHeader } from '@/components/PageHeader';
import { PaginationFooter } from '@/components/PaginationFooter';
import { ApplicationFlowsTable } from '@/components/tables';

export const ApplicationFlowsPage = () => {
  const [searchParams] = useSearchParams();

  const spOffset = getIntParamOrDefault(searchParams.get('offset'), DEFAULT_OFFSET);
  const offset = spOffset >= DEFAULT_OFFSET ? spOffset : DEFAULT_OFFSET;
  const limit = 25;

  const flowQuery = CqlQuery.rawQuery('cql.allRecords=1 sortBy startedAt/sort.descending').toText();
  const { isPending, data } = useQuery({
    staleTime: 0,
    queryKey: ['application-flows', { query: flowQuery, limit, offset }],
    queryFn: () => EntitlementClient.findApplicationFlowsByQuery(true, { query: flowQuery, limit: limit, offset }),
  });

  if (isPending) {
    return <div className="p-6">Loading application flows...</div>;
  }

  if (!data) {
    return <div className="p-6">Application flows not found</div>;
  }

  return (
    <div className="flex flex-col h-full min-w-full">
      <PageHeader title="Application Flows" totalRecords={data.totalRecords} />
      <ApplicationFlowsTable applicationFlows={data.applicationFlows} />
      <PaginationFooter totalRecords={data.totalRecords} pageLimit={limit} currentOffset={offset} />
    </div>
  );
};
