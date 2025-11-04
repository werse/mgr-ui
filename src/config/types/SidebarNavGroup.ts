import type { SidebarNavItem } from '@/config/types/SidebarNavItem.ts';
import type { IconName } from 'lucide-react/dynamic';

export interface SidebarNavGroup {
  title: string;
  url: string;
  items: SidebarNavItem[];
  icon?: IconName;
}
