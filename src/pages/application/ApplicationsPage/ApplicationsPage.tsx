import { ApplicationClient } from '@/integration/clients/ApplicationClient.ts';
import { GenericListPage } from '@/pages/common/GenericListPage';
import { TableLink } from '@/components/TableLink';
import { applicationDetailsRef } from '@/lib/links.tsx';

export const ApplicationsPage = () => {
  return (
    <GenericListPage
      title="Application Descriptors"
      rootQueryKey="applications"
      dataFetcher={(params) => ApplicationClient.findByQuery({ ...params, full: false })}
      dataExtractor={(resp) => ({data: resp.applicationDescriptors, totalRecords: resp.totalRecords})}
      showCreateButton={true}
      pageLimit={100}
      shouldShowHeader={(location) => location.pathname === '/applications'}
      tableColumnDefinitions={[
        {
          title: 'Name',
          key: 'name',
          render: (app) => <TableLink to={applicationDetailsRef(app.id)} title={app.id} />,
          cellClassName: 'max-w-[60ch] truncate',
        },
        {
          title: 'Description',
          key: 'description',
          render: (app) => <span>{app.description || 'N/A'}</span>,
          cellClassName: 'max-w-[40ch] truncate',
        },
      ]}
    />
  );
};
