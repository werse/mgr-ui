import { cn } from '@/lib/utils.ts';

type Props = {
  title: string;
  totalRecords?: number;
  children?: React.ReactNode;
  className?: string;
};
export const PageHeader = ({ title, totalRecords, children, className }: Props) => {
  return (
    <div className={cn('flex p-2 h-14 border-b w-full', className)}>
      <div className="flex flex-col w-full items-center h-full justify-center">
        <span className="text-lg font-semibold leading-5">{title}</span>
        {totalRecords && <span className="text-sm leading-4">{totalRecords} record(s) found</span>}
      </div>
      {children}
    </div>
  );
};
