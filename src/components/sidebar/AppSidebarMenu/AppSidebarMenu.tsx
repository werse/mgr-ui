import { NAVIGATION_LAYOUT } from '@/config';
import type { SidebarNavGroup } from '@/config/types';
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar.tsx';
import { MenuItemOptions } from '@/components/sidebar/MenuItemOptions';
import { MenuItemTrigger } from '@/components/sidebar/MenuItemTrigger';

export const AppSidebarMenu = () => {
  return (
    <SidebarMenu>
      {NAVIGATION_LAYOUT.navMain.map((group: SidebarNavGroup) => {
        return (
          <SidebarMenuItem key={group.title}>
            <MenuItemTrigger group={group} />
            <MenuItemOptions group={group} />
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};
