import { CqlQuery } from '@/lib/cql-query';
import { EntitlementClient } from '@/integration/clients';
import { FlowIndicator } from '@/components/FlowIndication';
import { FlowTiming } from '@/components/FlowTiming';
import { GenericListPage } from '@/pages/common';

export const FlowStagesPage = () => {
  return (
    <GenericListPage
      title="Flow Stages"
      rootQueryKey={'flow-stages'}
      defaultCqlQuery={CqlQuery.matchAll()}
      dataFetcher={(_, pathParams) => EntitlementClient.findFlowStages(pathParams['applicationFlowId']!)}
      getSearchQuery={(pathParams) => CqlQuery.exactMatch('id', pathParams['applicationFlowId']!)}
      dataExtractor={(resp) => ({ data: resp.stages, totalRecords: resp.totalRecords })}
      shouldShowHeader={() => false}
      showPaginationFooter={false}
      tableColumnDefinitions={[
        {
          title: '',
          key: 'stage-grade',
          headerClassName: 'w-[1%]',
          render: (flow) => <FlowIndicator status={flow.status} />,
        },
        {
          title: 'Name',
          key: 'stage-name',
          headerClassName: 'w-[40%]',
          cellClassName: 'max-w-[60ch] truncate',
          render: (f) => <span>{f.name}</span>,
        },
        {
          title: 'Timing',
          key: 'stage-timing',
          headerClassName: 'w-[18%]',
          render: (f) => <FlowTiming startedAt={f.startedAt} finishedAt={f.finishedAt} />,
        },
      ]}
    />
  );
};
