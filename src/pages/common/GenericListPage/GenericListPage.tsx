import { type ReactNode } from 'react';
import { type Location, type Params, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { type QueryKey, useQuery } from '@tanstack/react-query';
import { DEFAULT_OFFSET, getIntParamOrDefault } from '@/lib/utils.ts';
import { CqlQuery } from '@/lib/cql-query';
import { PageHeader } from '@/components/PageHeader';
import { PaginationFooter } from '@/components/PaginationFooter';
import { Button } from '@/components/ui/button.tsx';
import { DynamicIcon } from 'lucide-react/dynamic';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { EntitiesDataTable } from '@/components/tables';
import type { DataTableColumnDefinition } from '@/components/tables/EntitiesDataTable';
import type { Identifiable } from '@/types/common';

interface QueryParams {
  query: string;
  limit: number;
  offset: number;
}

interface PageResponse<T> {
  totalRecords: number;
  data: T[];
}

interface GenericListPageConfig<TData extends Identifiable, TResponse> {
  title: string;
  rootQueryKey: string;
  dataFetcher: (params: QueryParams & Record<string, any>) => Promise<TResponse>;
  dataExtractor: (response: TResponse) => PageResponse<TData>;
  tableColumnDefinitions: DataTableColumnDefinition<TData>[];
  pageLimit?: number;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  getSearchQuery?: (params: Readonly<Params<string>>, location: Location) => string;
  additionalQueryParams?: Record<string, any>;
  customLoadingMessage?: string;
  customNotFoundMessage?: string;
  headerContent?: ReactNode;
  shouldShowHeader: (location: Location, params: Readonly<Params<string>>) => boolean;
  additionalQueryOptions?: Record<string, unknown>;
}

export function GenericListPage<TData extends Identifiable, TResponse>({
  title,
  rootQueryKey,
  dataFetcher,
  dataExtractor,
  tableColumnDefinitions,
  pageLimit = 50,
  showCreateButton = false,
  onCreateClick,
  getSearchQuery,
  additionalQueryParams = {},
  additionalQueryOptions = {},
  customLoadingMessage,
  customNotFoundMessage,
  shouldShowHeader,
  headerContent,
}: GenericListPageConfig<TData, TResponse>) {
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const spOffset = getIntParamOrDefault(searchParams.get('offset'), DEFAULT_OFFSET);
  const offset = spOffset >= DEFAULT_OFFSET ? spOffset : DEFAULT_OFFSET;

  const query = getSearchQuery ? getSearchQuery(params, location) : CqlQuery.matchAll().toText();
  const tsQueryKey: QueryKey = [rootQueryKey, { query, limit: pageLimit, offset, ...additionalQueryParams }];
  const { isPending, isFetching, data, refetch } = useQuery({
    queryKey: tsQueryKey,
    queryFn: () => dataFetcher({ query, limit: pageLimit, offset, ...additionalQueryParams }),
    ...additionalQueryOptions,
  });

  if (isPending) {
    return <div className="p-6">{customLoadingMessage || `Loading ${title.toLowerCase()}...`}</div>;
  }

  if (!data) {
    return <div className="p-6">{customNotFoundMessage || `${title} not found`}</div>;
  }

  const pageResponse = dataExtractor(data);

  const refreshData = () => {
    refetch().then(() => {});
  };

  return (
    <div className="flex flex-col h-full min-w-full">
      {shouldShowHeader(location, params) && (
        <PageHeader title={title} totalRecords={pageResponse.totalRecords}>
          {headerContent ||
            (showCreateButton && (
              <div className="ml-auto flex justify-items-end items-center mr-1">
                <Button
                  size={'icon-sm'}
                  variant="default"
                  onClick={refreshData}
                  disabled={isFetching}
                  className={'mr-1'}
                >
                  <DynamicIcon name={'refresh-cw'} className={isFetching ? 'animate-spin' : ''} />
                </Button>
                <Button size={'sm'} variant={'default'} onClick={onCreateClick}>
                  <DynamicIcon name="plus" />
                  <span>Create</span>
                </Button>
              </div>
            ))}
        </PageHeader>
      )}
      <ScrollArea
        className={`overflow-auto flex-1 p-4 transition-opacity duration-200 ${isFetching ? 'opacity-50 disabled' : 'opacity-100'}`}
      >
        <EntitiesDataTable
          data={pageResponse.data}
          globalKey={'tenants'}
          numerationOffset={offset}
          columnDefinitions={tableColumnDefinitions}
        />
      </ScrollArea>
      <PaginationFooter totalRecords={pageResponse.totalRecords} pageLimit={pageLimit} currentOffset={offset} />
    </div>
  );
}
