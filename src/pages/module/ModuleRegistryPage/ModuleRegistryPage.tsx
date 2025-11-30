import { useSearchParams } from 'react-router-dom';
import { DEFAULT_OFFSET, getIntParamOrDefault } from '@/lib/utils.ts';
import { useQuery } from '@tanstack/react-query';
import { ModuleRegistryClient } from '@/integration/clients';
import { PageHeader } from '@/components/PageHeader';
import { ModulesTable } from '@/components/tables/ModulesTable';

export const ModuleRegistryPage = () => {
  const [searchParams] = useSearchParams();

  const spOffset = getIntParamOrDefault(searchParams.get('offset'), DEFAULT_OFFSET);
  const offset = spOffset >= DEFAULT_OFFSET ? spOffset : DEFAULT_OFFSET;

  const { isPending, data } = useQuery({
    staleTime: 0,
    queryKey: ['okapi-modules', { full: false, latest: 1 }],
    queryFn: () => ModuleRegistryClient.find({ full: false, latest: 1 }),
  });

  if (isPending) {
    return <div className="p-6">Loading modules...</div>;
  }

  if (!data) {
    return <div className="p-6">Modules not found</div>;
  }

  return (
    <div className="flex flex-col h-full min-w-full">
      <PageHeader title="Modules" totalRecords={data.length} />
      <ModulesTable modules={data} idxOffset={offset} />
    </div>
  );
};
