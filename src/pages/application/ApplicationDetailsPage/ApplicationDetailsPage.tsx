import { useParams } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner.tsx';
import { EntityDetails } from '@/components/EntityDetails';
import { useApplicationById } from '@/hooks';
import { Badge } from '@/components/ui/badge.tsx';
import { ApplicationModules } from '@/components/ApplicationModules';

export const ApplicationDetailsPage = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const { isPending, data: application } = useApplicationById(applicationId);

  if (isPending) {
    return (
      <div className="p-6">
        <Spinner className="size-8" />
        <span>Loading applications</span>
      </div>
    );
  }

  if (!application) {
    return <div className="p-6">Application not found</div>;
  }

  //todo: Navigation to parent applications and
  //todo: Show module details page
  return (
    <EntityDetails
      entity={application}
      renderMap={[
        {
          key: 'application-name',
          title: 'Name',
          render: (app) => <span>{app.name}</span>,
        },
        {
          key: 'application-version',
          title: 'Version',
          render: (app) => <span>{app.version}</span>,
        },
        {
          key: 'application-description',
          title: 'Description',
          render: (app) => <span>{app.description}</span>,
        },
        {
          key: 'app-dependencies',
          title: 'Dependencies',
          render: (app) => (
            <div className="flex flex-wrap -m-1">
              {(app.dependencies || []).map((dep) => (
                <Badge
                  key={`${dep.name}-${dep.version}`}
                  className={'my-1 max-w-[30%] min-w-[30%] mr-[2%] last:mr-0 ${color}'}
                  variant={dep.optional ? 'outline' : 'secondary'}
                >
                  <span className={'pl-2 max-w-[80ch] truncate text-left'}>{`${dep.name}: ${dep.version}`}</span>
                </Badge>
              ))}
            </div>
          ),
        },
        {
          key: 'app-be-modules',
          title: 'Modules',
          render: (app) => <ApplicationModules modules={app.modules || []} />,
        },
        {
          key: 'app-ui-modules',
          title: 'UI Modules',
          render: (app) => <ApplicationModules modules={app.uiModules || []} />,
        },
        {
          key: 'app-createdBy',
          title: 'Created By',
          render: (app) => <span>{app.metadata?.createdBy || 'N/A'}</span>,
        },
        {
          key: 'app-createdDate',
          title: 'Created Date',
          render: (app) => <span>{app.metadata?.createdDate || 'N/A'}</span>,
        },
        {
          key: 'app-modifiedBy',
          title: 'Modified By',
          render: (app) => <span>{app.metadata?.modifiedBy || 'N/A'}</span>,
        },
        {
          key: 'app-modifiedDate',
          title: 'Modified Date',
          render: (app) => <span>{app.metadata?.modifiedDate || 'N/A'}</span>,
        },
      ]}
    />
  );
};
