import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { TenantClient } from '@/integration/clients/TenantClient';
import { useQuery } from '@tanstack/react-query';
import { CqlQuery } from '@/lib/cql-query';
import { DEFAULT_OFFSET, getBackReference, getIntParamOrDefault } from '@/lib/utils.ts';
import { PaginationFooter } from '@/components/PaginationFooter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button.tsx';
import { DynamicIcon } from 'lucide-react/dynamic';
import { PageHeader } from '@/components/PageHeader';
import { EntitiesDataTable } from '@/components/EntitiesDataTable';
import type { Tenant } from '@/types/tenant';

export const TenantsPage = () => {
  const location = useLocation();
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

  const renderTenantNameCell = (tenant: Tenant) => (
    <Link to={`/tenants/${tenant.id}/details`} state={getBackReference(location)} className="hover:underline">
      {tenant.name}
    </Link>
  );

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
      <ScrollArea className="overflow-auto flex-1 p-4">
        <EntitiesDataTable
          data={data.tenants}
          globalKey={'tenants'}
          numerationOffset={offset}
          columnDefinitions={[
            {
              title: 'Name',
              key: 'name',
              headerClassName: 'w-[25%]',
              render: renderTenantNameCell,
              cellClassName: 'max-w-[20ch] truncate',
            },
            {
              title: 'Description',
              key: 'description',
              render: (tenant: Tenant) => <span>{tenant.description || 'N/A'}</span>,
              cellClassName: 'max-w-[40ch] truncate',
            },
          ]}
        />
      </ScrollArea>
      <PaginationFooter totalRecords={data.totalRecords} pageLimit={pageLimit} currentOffset={offset} />
    </div>
  );
};
