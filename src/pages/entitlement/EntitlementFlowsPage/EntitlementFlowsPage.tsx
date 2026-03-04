import { CqlQuery } from '@/lib/cql-query';
import { EntitlementClient } from '@/integration/clients';
import { GenericListPage } from '@/pages/common';
import { FlowIndicator } from '@/components/FlowIndication';
import { FlowTiming } from '@/components/FlowTiming';
import { TableLink } from '@/components/TableLink';
import { entitlementFlowDetailsRef, tenantDetailsRef } from '@/lib/links.tsx';

export const EntitlementFlowsPage = () => {
  return (
    <GenericListPage
      title="Entitlement Flows"
      rootQueryKey={'entitlement-flows'}
      defaultCqlQuery={CqlQuery.matchAll().sortBy('startedAt', 'descending')}
      dataFetcher={(params) => EntitlementClient.findEntitlementFlowsByQuery(true, params)}
      dataExtractor={(resp) => ({ data: resp.flows, totalRecords: resp.totalRecords })}
      tableColumnDefinitions={[
        {
          title: '',
          key: 'grade',
          headerClassName: 'w-[2%]',
          render: (f) => <FlowIndicator status={f.status} />,
        },
        {
          title: 'Type',
          key: 'type',
          headerClassName: 'w-[10%]',
          cellClassName: 'uppercase',
          render: (f) => <TableLink to={entitlementFlowDetailsRef(f.id)} title={f.type} />,
        },
        {
          title: 'Tenant Name',
          key: 'tenant-name',
          render: (f) => <TableLink to={tenantDetailsRef(f.tenantId)} title={f.tenantName || f.tenantId} />,
        },
        {
          title: 'Timing',
          key: 'timing',
          headerClassName: 'w-[18%]',
          render: (f) => <FlowTiming startedAt={f.startedAt} finishedAt={f.finishedAt} />,
        },
      ]}
      shouldShowHeader={() => true}
    />
  );
};
