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
  defaultCqlQuery?: CqlQuery;
  dataFetcher: (params: QueryParams & Record<string, any>, pathParams: Readonly<Params<string>>) => Promise<TResponse>;
  dataExtractor: (response: TResponse) => PageResponse<TData>;
  tableColumnDefinitions: DataTableColumnDefinition<TData>[];
  pageLimit?: number;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  getSearchQuery?: (params: Readonly<Params<string>>, location: Location, defaultQuery: CqlQuery) => CqlQuery;
  additionalQueryParams?: Record<string, any>;
  customLoadingMessage?: string;
  customNotFoundMessage?: string;
  shouldShowHeader: (location: Location, params: Readonly<Params<string>>) => boolean;
  additionalQueryOptions?: Record<string, unknown>;
  showPaginationFooter?: boolean;
}

export function GenericListPage<TData extends Identifiable, TResponse>({
  title,
  rootQueryKey,
  dataFetcher,
  dataExtractor,
  defaultCqlQuery = CqlQuery.matchAll(),
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
  showPaginationFooter = true,
}: GenericListPageConfig<TData, TResponse>) {
  const location = useLocation();
  const pathParams = useParams();
  const [searchParams] = useSearchParams();

  const spOffset = getIntParamOrDefault(searchParams.get('offset'), DEFAULT_OFFSET);
  const offset = spOffset >= DEFAULT_OFFSET ? spOffset : DEFAULT_OFFSET;

  const query = (getSearchQuery ? getSearchQuery(pathParams, location, defaultCqlQuery) : defaultCqlQuery).toText();
  const tsQueryKey: QueryKey = [rootQueryKey, { query, limit: pageLimit, offset, ...additionalQueryParams }];
  const { isPending, isFetching, data, refetch } = useQuery({
    queryKey: tsQueryKey,
    queryFn: () => dataFetcher({ query, limit: pageLimit, offset, ...additionalQueryParams }, pathParams),
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
      {shouldShowHeader(location, pathParams) && (
        <PageHeader title={title} totalRecords={pageResponse.totalRecords}>
          <div className="ml-auto flex justify-items-end items-center mr-1">
            {showCreateButton && (
              <Button size={'sm'} variant={'default'} onClick={onCreateClick}>
                <DynamicIcon name="plus" />
                <span>Create</span>
              </Button>
            )}
            <Button size={'icon-sm'} variant="default" onClick={refreshData} disabled={isFetching} className={'ml-1'}>
              <DynamicIcon name={'refresh-cw'} className={isFetching ? 'animate-spin' : ''} />
            </Button>
          </div>
        </PageHeader>
      )}
      <ScrollArea
        className={`overflow-auto flex-1 p-4 transition-opacity duration-200 ${isFetching ? 'opacity-50 disabled' : 'opacity-100'}`}
      >
        <EntitiesDataTable
          data={pageResponse.data}
          globalKey={rootQueryKey}
          numerationOffset={offset}
          columnDefinitions={tableColumnDefinitions}
        />
      </ScrollArea>
      {showPaginationFooter && (
        <PaginationFooter totalRecords={pageResponse.totalRecords} pageLimit={pageLimit} currentOffset={offset} />
      )}
    </div>
  );
}
