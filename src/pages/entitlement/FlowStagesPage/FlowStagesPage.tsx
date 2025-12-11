import { CqlQuery } from '@/lib/cql-query';
import { EntitlementClient } from '@/integration/clients';
import { FlowIndicator } from '@/components/FlowIndication';
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
          title: 'Start Time',
          key: 'stage-startedAt',
          headerClassName: 'w-[18%]',
          cellClassName: 'max-w-[10ch] truncate',
          render: (f) => <span>{f.startedAt}</span>,
        },
        {
          title: 'End Time',
          key: 'stage-finishedAt',
          headerClassName: 'w-[18%]',
          cellClassName: 'max-w-[10ch] truncate',
          render: (f) => <span>{f.finishedAt}</span>,
        },
      ]}
    />
  );
};
