import type {EntitlementsCollection} from "@/types/mgr-tenant-entitlements";
import {EntitlementClient} from "@/integration/clients";
import {TableLink} from "@/components/TableLink";
import {applicationDetailsRef} from "@/lib/links.tsx";
import {GenericListPage} from "@/pages/common";
import type { Params } from "react-router-dom";
import {CqlQuery} from "@/lib/cql-query";

const getSearchQuery = (params: Readonly<Params<string>>): CqlQuery => {
  const tenantId = params.tenantId;
  if (tenantId) {
    return CqlQuery.exactMatch('tenantId', tenantId);
  }

  return CqlQuery.matchAll();
};

export const TenantEntitlementsPage = () => {
  return (
    <GenericListPage<any, EntitlementsCollection>
      title="Tenant Entitlements"
      rootQueryKey="entitlements"
      dataFetcher={(params) => EntitlementClient.findByQuery(true, params)}
      dataExtractor={(resp) => ({ data: resp.entitlements, totalRecords: resp.totalRecords })}
      shouldShowHeader={() => false}
      getSearchQuery={getSearchQuery}
      tableColumnDefinitions={[
        {
          title: 'Application ID',
          key: 'mte-application-id',
          headerClassName: 'w-[50%]',
          render: (e) => <TableLink to={applicationDetailsRef(e.applicationId)} title={e.applicationId} />,
          cellClassName: 'max-w-[60ch] truncate',
        },
      ]}
    />
  );
}
