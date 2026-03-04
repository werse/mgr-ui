import type {ModuleDescriptor} from "@/types/mgr-applications";
import {Badge} from "@/components/ui/badge.tsx";

export const ApplicationModules =({modules}: {modules: ModuleDescriptor[]}) => {
  return (
    <div className="flex flex-wrap -my-1">
      {modules
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((module) => (
          <Badge
            variant="outline"
            key={`${module.name}-${module.version}`}
            className={`my-1 max-w-[30%] min-w-[30%] mr-[2%] last:mr-0`}
          >
              <span
                className={'pl-2 max-w-[60ch] truncate text-left hover:underline hover:cursor-pointer'}
              >{`${module.name}-${module.version}`}</span>
          </Badge>
        ))}
    </div>
  );
};
