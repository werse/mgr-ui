import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader } from '@/components/ui/sidebar';
import { Header } from '@/components/sidebar/Header';
import { AppSidebarMenu } from '@/components/sidebar/AppSidebarMenu';

export const AppSidebar = (props: object) => {
  return (
    <Sidebar {...props} collapsible="offcanvas" className="border-1 select-none">
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <AppSidebarMenu />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
