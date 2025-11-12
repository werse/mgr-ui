import { GalleryVerticalEnd } from 'lucide-react';
import { h4 } from '@/lib/typography.ts';

export const Header = () => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div
        className="bg-sidebar-primary text-sidebar-primary-foreground
         flex aspect-square size-8 items-center justify-center rounded-lg"
      >
        <GalleryVerticalEnd className="size-4" />
      </div>
      <div className="flex flex-col gap-0.5 leading-none">
        <h2 className={h4}>Eureka Dashboard</h2>
      </div>
    </div>
  );
};
