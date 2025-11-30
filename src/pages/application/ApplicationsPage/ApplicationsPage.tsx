import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button.tsx';
import { DynamicIcon } from 'lucide-react/dynamic';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { DEFAULT_OFFSET, getBackReference, getIntParamOrDefault } from '@/lib/utils.ts';
import { PaginationFooter } from '@/components/PaginationFooter';
import { CqlQuery } from '@/lib/cql-query';
import { useQuery } from '@tanstack/react-query';
import { ApplicationClient } from '@/integration/clients/ApplicationClient.ts';
import { EntitiesDataTable } from '@/components/EntitiesDataTable';
import type { AppDescriptor } from '@/types/mgr-applications';

export const ApplicationsPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const pageLimit = 50;

  const spOffset = getIntParamOrDefault(searchParams.get('offset'), DEFAULT_OFFSET);
  const offset = spOffset >= DEFAULT_OFFSET ? spOffset : DEFAULT_OFFSET;

  const query = CqlQuery.matchAll().toText();
  const { isPending, data } = useQuery({
    queryKey: ['applications', { query, limit: pageLimit, offset }],
    queryFn: () => ApplicationClient.findByQuery({ query, limit: pageLimit, offset, full: false }),
  });

  if (isPending) {
    return <div className="p-6">Loading applications...</div>;
  }

  if (!data) {
    return <div className="p-6">Applications not found</div>;
  }

  const renderAppDescriptorIdCell = (appDescriptor: AppDescriptor) => (
    <Link
      to={`/applications/${appDescriptor.id}/details`}
      state={getBackReference(location)}
      className="hover:underline"
    >
      {appDescriptor.id}
    </Link>
  );

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Application Descriptors" totalRecords={data.totalRecords}>
        <div className="ml-auto flex justify-items-end items-center mr-1">
          <Button size={'sm'} variant={'default'}>
            <DynamicIcon name="plus" />
            <span>Create</span>
          </Button>
        </div>
      </PageHeader>
      <ScrollArea className="overflow-auto flex-1 p-4">
        <EntitiesDataTable
          data={data.applicationDescriptors}
          globalKey={'apps'}
          numerationOffset={0}
          columnDefinitions={[
            {
              title: 'Name',
              key: 'name',
              headerClassName: 'w-[35%]',
              render: renderAppDescriptorIdCell,
              cellClassName: 'max-w-[60ch] truncate',
            },
            {
              title: 'Description',
              key: 'description',
              render: (appDesc: AppDescriptor) => <span>{appDesc.description || 'N/A'}</span>,
              cellClassName: 'max-w-[40ch] truncate',
            },
          ]}
        />
      </ScrollArea>
      <PaginationFooter totalRecords={data.totalRecords} pageLimit={pageLimit} currentOffset={offset} />
    </div>
  );
};
