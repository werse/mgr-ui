import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { NightModeToggle } from '@/components/NightModeToggle';
import { HeaderBreadcrumb } from '@/components/HeaderBreadcrumb';

export function SiteHeader() {
  return (
    <header
      className="flex h-12 shrink-0 items-center gap-2 border-b
      transition-[width,height] ease-linear
      group-has-data-[collapsible=icon]/sidebar-wrapper:h-(20)"
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx- data-[orientation=vertical]:h-2" />
        <HeaderBreadcrumb />
        <div className="ml-auto flex justify-items-end items-center">
          <NightModeToggle />
        </div>
      </div>
    </header>
  );
}
