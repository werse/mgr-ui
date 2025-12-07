import { type Location, type Params } from 'react-router-dom';
import { CqlQuery } from '@/lib/cql-query';
import { EntitlementClient } from '@/integration/clients';
import { GenericListPage } from '@/pages/common/GenericListPage';
import type { EntitlementsCollection } from '@/types/mgr-tenant-entitlements';
import { TableLink } from '@/components/TableLink';
import { applicationDetailsRef, tenantDetailsRef } from '@/lib/links.tsx';

const getSearchQuery = (params: Readonly<Params<string>>, location: Location): string => {
  const applicationId = params['applicationId'];
  if (applicationId && location.pathname.startsWith('/applications')) {
    return CqlQuery.exactMatch('applicationId', applicationId).toText();
  }

  return CqlQuery.matchAll().toText();
};

export const EntitlementsPage = () => {
  return (
    <GenericListPage<any, EntitlementsCollection>
      title="Tenant Entitlements"
      rootQueryKey="entitlements"
      dataFetcher={(params) => EntitlementClient.findByQuery(true, params)}
      dataExtractor={(resp) => ({data: resp.entitlements, totalRecords: resp.totalRecords})}
      showCreateButton={true}
      getSearchQuery={getSearchQuery}
      shouldShowHeader={(location) => location.pathname.startsWith('/entitlements')}
      tableColumnDefinitions={[
        {
          title: 'Application ID',
          key: 'mte-application-id',
          headerClassName: 'w-[50%]',
          render: (e) => <TableLink to={applicationDetailsRef(e.applicationId)} title={e.applicationId} />,
          cellClassName: 'max-w-[60ch] truncate',
        },
        {
          title: 'Tenant Name',
          key: 'mte-tenant-id',
          render: (e) => <TableLink to={tenantDetailsRef(e.tenantId)} title={e.tenantName || e.tenantId} />,
          cellClassName: 'max-w-[40ch] truncate',
        },
      ]}
    />
  );
};
