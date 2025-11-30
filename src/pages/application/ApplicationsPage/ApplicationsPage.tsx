import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button.tsx';
import { DynamicIcon } from 'lucide-react/dynamic';
import { DEFAULT_OFFSET, getIntParamOrDefault } from '@/lib/utils.ts';
import { PaginationFooter } from '@/components/PaginationFooter';
import { CqlQuery } from '@/lib/cql-query';
import { useQuery } from '@tanstack/react-query';
import { ApplicationClient } from '@/integration/clients/ApplicationClient.ts';
import { ApplicationsTable } from '@/components/tables';

export const ApplicationsPage = () => {
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
      <ApplicationsTable applications={data.applicationDescriptors} idxOffset={offset} />
      <PaginationFooter totalRecords={data.totalRecords} pageLimit={pageLimit} currentOffset={offset} />
    </div>
  );
};
