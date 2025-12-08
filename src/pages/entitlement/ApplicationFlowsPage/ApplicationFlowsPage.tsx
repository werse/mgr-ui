import { CqlQuery } from '@/lib/cql-query';
import { EntitlementClient } from '@/integration/clients';
import { FlowIndicator } from '@/components/FlowIndication';
import { TableLink } from '@/components/TableLink';
import { applicationDetailsRef, applicationFlowDetailsRef, tenantDetailsRef } from '@/lib/links.tsx';
import { GenericListPage } from '@/pages/common';
import type { Location, Params } from 'react-router-dom';

const getSearchQuery = (params: Readonly<Params<string>>, location: Location, defaultQuery: CqlQuery): CqlQuery => {
  const applicationId = params['applicationId'];
  if (applicationId && location.pathname.startsWith('/applications')) {
    return CqlQuery.exactMatch('applicationId', applicationId).sortBy("startedAt", "descending");
  }

  return defaultQuery;
};

export const ApplicationFlowsPage = () => {
  return (
    <GenericListPage
      title="Entitlement Flows"
      rootQueryKey={'application-flows'}
      defaultCqlQuery={CqlQuery.matchAll().sortBy("startedAt", "descending")}
      dataFetcher={(params) => EntitlementClient.findApplicationFlowsByQuery(true, params)}
      dataExtractor={(resp) => ({ data: resp.applicationFlows, totalRecords: resp.totalRecords })}
      shouldShowHeader={(location) => location.pathname.startsWith('/application-flows')}
      getSearchQuery={(params, location, defaultQuery) => getSearchQuery(params, location, defaultQuery)}
      tableColumnDefinitions={[
        {
          title: '',
          key: 'grade',
          headerClassName: 'w-[1%]',
          render: (flow) => <FlowIndicator status={flow.status} />,
        },
        {
          title: 'Type',
          key: 'type',
          headerClassName: 'w-[6%]',
          cellClassName: 'uppercase',
          render: (f) => <TableLink to={applicationFlowDetailsRef(f.id)} title={f.type} />,
        },
        {
          title: 'Application Id',
          key: 'app-id',
          render: (f) => <TableLink to={applicationDetailsRef(f.applicationId)} title={f.applicationId} />,
        },
        {
          title: 'Tenant',
          key: 'tenant',
          render: (f) => <TableLink to={tenantDetailsRef(f.tenantId)} title={f.tenantName || f.tenantId} />,
        },
        {
          title: 'Start Time',
          key: 'startedAt',
          headerClassName: 'w-[18%]',
          cellClassName: 'max-w-[10ch] truncate',
          render: (f) => <span>{f.startedAt}</span>,
        },
        {
          title: 'End Time',
          key: 'finishedAt',
          headerClassName: 'w-[18%]',
          cellClassName: 'max-w-[10ch] truncate',
          render: (f) => <span>{f.finishedAt}</span>,
        },
      ]}
    />
  );
};
