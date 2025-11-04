import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SiteHeader } from '@/components/SiteHeader';
import { Outlet } from 'react-router-dom';

export function RootPage() {
  return (
    <SidebarProvider className="select-none">
      <AppSidebar />

      <SidebarInset className="relative md:peer-data-[variant=inset]:rounded-none
        md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0">
        <main className="min-h-[calc(100vh-var(--spacing)*12)] max-h-[calc(100vh-var(--spacing)*12)]">
          <SiteHeader />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
