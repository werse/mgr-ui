import {CqlQuery} from "@/lib/cql-query";
import {EntitlementClient} from "@/integration/clients";
import {FlowIndicator} from "@/components/FlowIndication";
import {FlowTiming} from "@/components/FlowTiming";
import {TableLink} from "@/components/TableLink";
import {entitlementFlowDetailsRef} from "@/lib/links.tsx";
import {GenericListPage} from "@/pages/common";
import type {Location, Params} from "react-router-dom";

const getSearchQuery = (params: Readonly<Params<string>>, _: Location, defaultQuery:CqlQuery): CqlQuery => {
  const tenantId = params.tenantId;
  if (tenantId) {
    return CqlQuery.exactMatch('tenantId', tenantId);
  }

  return defaultQuery;
};

export const TenantEntitlementFlowsPage = () => {
  return (
    <GenericListPage
      title="Entitlement Flows"
      rootQueryKey={'entitlement-flows'}
      defaultCqlQuery={CqlQuery.matchAll().sortBy('startedAt', 'descending')}
      dataFetcher={(params) => EntitlementClient.findEntitlementFlowsByQuery(true, params)}
      dataExtractor={(resp) => ({ data: resp.flows, totalRecords: resp.totalRecords })}
      getSearchQuery={getSearchQuery}
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
          title: 'Timing',
          key: 'timing',
          headerClassName: 'w-[18%]',
          render: (f) => <FlowTiming startedAt={f.startedAt} finishedAt={f.finishedAt} />,
        },
      ]}
      shouldShowHeader={() => false}
    />
  );
}
