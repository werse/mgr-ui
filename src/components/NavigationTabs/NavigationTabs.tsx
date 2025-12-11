import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { Link, type To, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export type NavigationTabDef = {
  title: string;
  key: string;
  to: To;
  default?: boolean;
};

type Props = {
  tabElements: NavigationTabDef[];
};

export const NavigationTabs = ({ tabElements }: Props) => {
  const location = useLocation();

  // Determine the active tab based on the current location
  const activeTab = useMemo(() => {
    // First, try to find a tab where the current path matches exactly
    const exactMatch = tabElements.find((tab) => {
      const tabPath = typeof tab.to === 'string' ? tab.to : tab.to.pathname;
      return location.pathname === tabPath;
    });

    if (exactMatch) return exactMatch.title;

    // If no exact match, find the tab whose path is a prefix of the current path
    const prefixMatch = tabElements.find((tab) => {
      const tabPath = typeof tab.to === 'string' ? tab.to : tab.to.pathname;
      return tabPath && location.pathname.startsWith(tabPath);
    });

    if (prefixMatch) return prefixMatch.title;

    // Fallback to default tab or first tab
    return tabElements.find((tab) => tab.default)?.title || tabElements[0]?.title || '';
  }, [location.pathname, tabElements]);

  return (
    <div className="mt-2 pr-4 pl-4">
      <Tabs value={activeTab} className="w-full">
        <TabsList className="bg-background justify-start rounded-none p-0 w-full h-12">
          {tabElements.map((tab) => (
            <TabsTrigger
              key={`${tab.key}`}
              value={tab.title}
              className={`bg-background dark:data-[state=active]:bg-background
                data-[state=inactive]:border-b-border dark:data-[state=active]:border-border
                dark:data-[state=inactive]:border-b rounded-none rounded-t-xl border border-transparent
                data-[state=active]:shadow-none dark:border-b-0 dark:data-[state=active]:-mb-0.5
                flex flex-1 p-0 first:border-l-0 first:rounded-tl-none last:border-r-0 last:rounded-tr-none`}
            >
              <Link
                to={tab.to}
                className="pointer-events-auto flex w-full h-full z-50 inset-0.5 items-center justify-center -m-0.5"
              >
                <span className={'font-semibold'}>{tab.title}</span>
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
