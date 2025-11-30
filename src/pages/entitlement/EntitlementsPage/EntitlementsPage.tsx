import { useSearchParams } from 'react-router-dom';
import { DEFAULT_OFFSET, getIntParamOrDefault } from '@/lib/utils.ts';
import { CqlQuery } from '@/lib/cql-query';
import { useQuery } from '@tanstack/react-query';
import { EntitlementClient } from '@/integration/clients';
import { EntitlementsTable } from '@/components/tables';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button.tsx';
import { DynamicIcon } from 'lucide-react/dynamic';
import { PaginationFooter } from '@/components/PaginationFooter';

export const EntitlementsPage = () => {
  const [searchParams] = useSearchParams();
  const limit = 50;

  const spOffset = getIntParamOrDefault(searchParams.get('offset'), DEFAULT_OFFSET);
  const offset = spOffset >= DEFAULT_OFFSET ? spOffset : DEFAULT_OFFSET;

  const query = CqlQuery.matchAll().toText();
  const { isPending, data } = useQuery({
    queryKey: ['entitlements', { query: query, limit, offset }],
    queryFn: () => EntitlementClient.findByQuery(true, { query, limit, offset }),
  });

  if (isPending) {
    return <div className="p-6">Loading entitlements...</div>;
  }

  if (!data) {
    return <div className="p-6">Entitlements not found</div>;
  }

  return (
    <div className="flex flex-col h-full min-w-full">
      <PageHeader title="Tenant Entitlements" totalRecords={data.totalRecords}>
        <div className="ml-auto flex justify-items-end items-center mr-1">
          <Button size={'sm'} variant={'default'}>
            <DynamicIcon name="plus" />
            <span>Create</span>
          </Button>
        </div>
      </PageHeader>
      <EntitlementsTable entitlements={data.entitlements} idxOffset={offset} />
      <PaginationFooter totalRecords={data.totalRecords} pageLimit={limit} currentOffset={offset} />
    </div>
  );
};
