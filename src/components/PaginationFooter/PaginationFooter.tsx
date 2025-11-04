import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import { useNavigateWithParams } from '@/hooks/useNavigateWithSearchParams.ts';
import { DEFAULT_OFFSET } from '@/lib/utils.ts';

type Props = {
  currentOffset: number;
  totalRecords: number;
  pageLimit: number;
};

type PageNavigationItemProps = {
  idx: number;
  to: (newPage: number) => void;
  className?: string;
};

const PageNavItem = ({ idx, to, className }: PageNavigationItemProps) => {
  return (
    <PaginationItem className={className}>
      <PaginationLink onClick={() => to(idx)}>{idx}</PaginationLink>
    </PaginationItem>
  );
};

export const PaginationFooter = ({ currentOffset, totalRecords, pageLimit }: Props) => {
  const navigateWithParams = useNavigateWithParams();
  // ensure pageLimit is at least 1 to avoid divide-by-zero
  const safePageLimit = Math.max(1, pageLimit);
  const isNextDisabled = safePageLimit + currentOffset >= totalRecords;
  const isPreviousDisabled = currentOffset <= DEFAULT_OFFSET;

  // current page: offset is 0-based, so page = floor(offset / limit) + 1
  const currentPageIdx = totalRecords === 0 ? 1 : Math.floor(currentOffset / safePageLimit) + 1;
  const lastPageNum = totalRecords === 0 ? 1 : Math.ceil(totalRecords / safePageLimit);

  const navigateSafe = (newPage: number) => {
    navigateWithParams({ offset: `${Math.max(DEFAULT_OFFSET, pageLimit * (newPage - 1))}` });
  };

  const firstPageIdx = 1;
  const prevPageIdx = Math.max(firstPageIdx, currentPageIdx - 1);
  const nextPageIdx = Math.min(lastPageNum, currentPageIdx + 1);
  const prevPrevPageIdx = Math.max(firstPageIdx, currentPageIdx - 2);
  const nextNextPageIdx = Math.min(lastPageNum, currentPageIdx + 2);

  return (
    // Make footer positioned at the bottom of the nearest positioned ancestor (SidebarInset)
    <div className="bg-background/80 backdrop-blur-sm border-t">
      <div className="mx-auto px-4 py-2">
        <div className="flex-1 flex justify-center text-accent-foreground/50">
          <Pagination className={"flex"}>
            <PaginationContent className={"flex min-w-1/3 items-center justify-between"}>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => navigateSafe(prevPageIdx)}
                  aria-disabled={isPreviousDisabled}
                  className={isPreviousDisabled ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              <div className={"flex w-80 justify-center items-center"}>
                {currentPageIdx != firstPageIdx && <PageNavItem idx={firstPageIdx} to={navigateSafe} />}
                {prevPrevPageIdx != firstPageIdx && <PaginationEllipsis />}
                {prevPageIdx != firstPageIdx && (<PageNavItem idx={prevPageIdx} to={navigateSafe} />)}
                <PageNavItem idx={currentPageIdx} to={navigateSafe} className="bg-accent rounded-md" />
                {nextPageIdx != lastPageNum && (<PageNavItem idx={nextPageIdx} to={navigateSafe} />)}
                {nextNextPageIdx != lastPageNum && <PaginationEllipsis />}
                {currentPageIdx != lastPageNum && <PageNavItem idx={lastPageNum} to={navigateSafe} />}
              </div>
              <PaginationItem>
                <PaginationNext
                  onClick={() => navigateSafe(nextPageIdx)}
                  aria-disabled={isNextDisabled}
                  className={isNextDisabled ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};
