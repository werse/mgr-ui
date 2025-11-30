import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { Link, type To } from 'react-router-dom';

export type NavigationTabDef = {
  title: string;
  key: string;
  to: To;
  default?: boolean;
};

type Props = {
  tabElements: NavigationTabDef[];
  redirectState?: unknown;
};

export const NavigationTabs = ({ tabElements, redirectState }: Props) => {
  let getDefaultValue = tabElements.filter((tab) => tab.default)[0]?.title || tabElements[0]?.title || '';
  return (
    <div className="mt-2 pr-4 pl-4">
      <Tabs defaultValue={getDefaultValue} className="w-full">
        <TabsList className="bg-background justify-start rounded-none border-b p-0 w-full h-12">
          {tabElements.map((tab) => (
            <TabsTrigger
              key={`${tab.key}`}
              value={tab.title}
              className="w-1/3 bg-background border-b-border dark:data-[state=active]:bg-background
                data-[state=active]:border-border data-[state=active]:border-b-background
                rounded-none rounded-t-xl border border-transparent data-[state=active]:-mb-0.5
                data-[state=active]:shadow-none dark:border-b-0 dark:data-[state=active]:-mb-0.5
                flex flex-1 p-0 first:border-l-0 first:rounded-tl-none last:border-r-0 last:rounded-tr-none
                pointer-events-none"
            >
              <Link
                to={tab.to}
                state={redirectState}
                className="pointer-events-auto flex w-full h-full z-50 inset-[2px] items-center justify-center -m-[2px]"
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
