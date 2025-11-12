import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { h1, inlineCode, p } from '@/lib/typography.ts';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { NAVIGATION_LAYOUT } from '@/config';

interface ButtonProps {
  icon?: IconName;
  title: string;
  url: string;
}
const HomePageButton = ({ icon, title, url }: ButtonProps) => {
  return (
    <div className={'flex w-3/8 m-2'}>
      <Button variant="outline" size="lg" asChild className="h-48 w-full [&_svg:not([class*='size-'])]:size-10">
        <Link to={url} className={'flex justify-center'}>
          <div className={'pr-2'}>{icon && <DynamicIcon name={icon} />}</div>
          <span className="select-none text-lg">{title}</span>
        </Link>
      </Button>
    </div>
  );
};

export const HomePage = () => {
  return (
    <div className="h-full w-full p-6">
      <div className={'mb-6'}>
        <h1 className={h1}>Welcome to Eureka Dashboard</h1>
      </div>
      <div className={'text-foreground/80'}>
        <p className={`${p} indent-2`}>
          Provides access for Eureka manager components and allows you to manage tenants, applications, entitlements and
          deployments.
        </p>
        <p className={`${p} indent-2`}>
          This applications stores data in browser using <code className={inlineCode}>react-secure-storage</code> and
          indexedDB. All configuration properties are stored in <code className={inlineCode}>local storage</code>.
          Configuration can be exported using cog wheel on top.
        </p>
        <p className={`${p} indent-2`}>
          It also includes functionality to build your own applications using{' '}
          <code className={inlineCode}>folio-registry</code> module descriptors, using existing application as a source
          for verification.
        </p>
      </div>
      <div className="flex justify-center flex-wrap mt-10">
        {NAVIGATION_LAYOUT.navMain.map((group) => (
          <HomePageButton
            key={`home-page-button-${group.title}`}
            icon={group.icon}
            title={group.title}
            url={group.url}
          />
        ))}
      </div>
    </div>
  );
};
