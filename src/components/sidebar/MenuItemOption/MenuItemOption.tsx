import { SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar.tsx';
import { NavLink, useLocation } from 'react-router-dom';
import type { SidebarNavItem } from '@/config/types';
import { DynamicIcon } from 'lucide-react/dynamic';

interface Props {
  navItem: SidebarNavItem;
  basePath: string;
  groupTitle: string;
}

export const MenuItemOption = ({ navItem, groupTitle }: Props) => {
  const { pathname } = useLocation();
  const isActive = pathname === navItem.url || pathname.startsWith(navItem.url + '/');

  return (
    <SidebarMenuSubItem key={`${groupTitle}-${navItem.title}`}>
      <SidebarMenuSubButton asChild isActive={isActive} className="w-full">
        <NavLink to={navItem.url}>
          <div>{navItem.icon && <DynamicIcon name={navItem.icon} />}</div>
          <span className="select-none">{navItem.title}</span>
        </NavLink>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};
