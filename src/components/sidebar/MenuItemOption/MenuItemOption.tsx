import { SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar.tsx';
import { Link, useLocation } from 'react-router-dom';
import type { SidebarNavItem } from '@/config/types';
import { DynamicIcon } from 'lucide-react/dynamic';

interface Props {
  navItem: SidebarNavItem;
  basePath: string;
  groupTitle: string;
}

export const MenuItemOption = ({ navItem, groupTitle }: Props) => {

  const location = useLocation();
  return (
    <SidebarMenuSubItem key={`${groupTitle}-${navItem.title}`}>
      <SidebarMenuSubButton asChild isActive={location.pathname === `${navItem.url}`} className="w-full">
        <Link to={`${navItem.url}`}>
          <div>{navItem.icon && <DynamicIcon name={navItem.icon} />}</div>
          <span className="select-none">{navItem.title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};
