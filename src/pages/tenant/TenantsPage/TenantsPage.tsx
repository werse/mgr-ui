import { useSearchParams } from 'react-router-dom';
import { TenantClient } from '@/integration/clients/TenantClient';
import { useQuery } from '@tanstack/react-query';
import { CqlQuery } from '@/lib/cql-query';
import { DEFAULT_OFFSET, getIntParamOrDefault } from '@/lib/utils.ts';
import { PaginationFooter } from '@/components/PaginationFooter';
import { Button } from '@/components/ui/button.tsx';
import { DynamicIcon } from 'lucide-react/dynamic';
import { PageHeader } from '@/components/PageHeader';
import { TenantsTable } from '@/components/tables';

export const TenantsPage = () => {
  const [searchParams] = useSearchParams();
  const pageLimit = 50;

  const spOffset = getIntParamOrDefault(searchParams.get('offset'), DEFAULT_OFFSET);
  const offset = spOffset >= DEFAULT_OFFSET ? spOffset : DEFAULT_OFFSET;

  const query = CqlQuery.matchAll().toText();
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

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Tenants" totalRecords={data.totalRecords}>
        <div className="ml-auto flex justify-items-end items-center mr-1">
          <Button size={'sm'} variant={'default'}>
            <DynamicIcon name="plus" />
            <span>Create</span>
          </Button>
        </div>
      </PageHeader>
      <TenantsTable tenants={data.tenants} offset={offset} />
      <PaginationFooter totalRecords={data.totalRecords} pageLimit={pageLimit} currentOffset={offset} />
    </div>
  );
};
