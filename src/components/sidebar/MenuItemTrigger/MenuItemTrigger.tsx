import { SidebarMenuButton } from '@/components/ui/sidebar.tsx';
import { NavLink } from 'react-router-dom';
import { DynamicIcon } from 'lucide-react/dynamic';
import type { SidebarNavGroup } from '@/config/types';

interface Props {
  group: SidebarNavGroup;
}

export const MenuItemTrigger = ({ group }: Props) => (
  <NavLink to={group.url} className="flex justify-start cursor-pointer w-full">
    <SidebarMenuButton tooltip={group.title} className="w-full cursor-pointer">
      {group.icon && <DynamicIcon name={group.icon} />}
      <span>{group.title}</span>
    </SidebarMenuButton>
  </NavLink>
);
