import { SidebarMenuSub } from '@/components/ui/sidebar.tsx';
import { MenuItemOption } from '@/components/sidebar/MenuItemOption';
import type { SidebarNavItem, SidebarNavGroup } from '@/config/types';

interface Props {
  group: SidebarNavGroup;
}

export const MenuItemOptions = ({ group }: Props) => {
  return (
    <SidebarMenuSub key={group.title}>
      {group.items.map((item: SidebarNavItem) => {
        return (
          <MenuItemOption
            key={`${group.url}/${item.title}`}
            navItem={item}
            basePath={group.url}
            groupTitle={group.title}
          />
        );
      })}
    </SidebarMenuSub>
  );
};
