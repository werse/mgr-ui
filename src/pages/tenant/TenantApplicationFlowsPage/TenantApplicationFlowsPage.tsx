import {CqlQuery} from "@/lib/cql-query";
import {EntitlementClient} from "@/integration/clients";
import {FlowIndicator} from "@/components/FlowIndication";
import {FlowTiming} from "@/components/FlowTiming";
import {TableLink} from "@/components/TableLink";
import {applicationDetailsRef, applicationFlowDetailsRef} from "@/lib/links.tsx";
import {GenericListPage} from "@/pages/common";
import type {Location, Params} from "react-router-dom";

const getSearchQuery = (params: Readonly<Params<string>>, _: Location, defaultQuery: CqlQuery): CqlQuery => {
  const tenantId = params.tenantId;
  if (tenantId) {
    return CqlQuery.exactMatch('tenantId', tenantId);
  }

  return defaultQuery;
};

export const TenantApplicationFlowsPage = () => {
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
          title: 'Timing',
          key: 'timing',
          headerClassName: 'w-[18%]',
          render: (f) => <FlowTiming startedAt={f.startedAt} finishedAt={f.finishedAt} />,
        },
      ]}
    />
  );
}
