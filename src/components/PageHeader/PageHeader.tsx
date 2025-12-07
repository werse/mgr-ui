import { cn } from '@/lib/utils.ts';

type Props = {
  title: string;
  totalRecords?: number;
  children?: React.ReactNode;
  className?: string;
};
export const PageHeader = ({ title, totalRecords, children, className }: Props) => {
  return (
    <div className={cn('flex p-2 max-h-14 min-h-14 border-b w-full', className)}>
      <div className="flex flex-col w-full justify-center">
        <span className="text-center text-lg font-semibold leading-5">{title}</span>
        {totalRecords && <span className="text-center text-sm leading-4">{totalRecords} record(s) found</span>}
      </div>
      {children}
    </div>
  );
};
