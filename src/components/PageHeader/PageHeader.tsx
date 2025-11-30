import { cn } from '@/lib/utils.ts';
import { Link, type To } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { DynamicIcon } from 'lucide-react/dynamic';

type Props = {
  title: string;
  totalRecords?: number;
  children?: React.ReactNode;
  className?: string;
  backReference?: To;
};
export const PageHeader = ({ title, totalRecords, backReference, children, className }: Props) => {
  return (
    <div className={cn('flex p-2 max-h-14 min-h-14 border-b w-full', className)}>
      <div className="flex flex-col w-full justify-center">
        <span className="text-center text-lg font-semibold leading-5">{title}</span>
        {totalRecords && <span className="text-center text-sm leading-4">{totalRecords} record(s) found</span>}
      </div>
      {backReference && (
        <Link to={backReference}>
          <Button
            variant="secondary"
            size="lg"
            className={
              'max-w-25 absolute right-0 top-14 w-25 min-w-25 mr-2 shadow-lg z-30 opacity-30 hover:opacity-100'
            }
          >
            <DynamicIcon name="undo"/>
            <span className="font-bold text-lg">Back</span>
          </Button>
        </Link>
      )}
      {children}
    </div>
  );
};
