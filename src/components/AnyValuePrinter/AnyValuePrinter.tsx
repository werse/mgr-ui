import { p } from '@/lib/typography.ts';

export const AnyValuePrinter = ({ value }: { value: unknown }) => {
  if (value === null || value === undefined) {
    return <span className={p}>{String(value)}</span>;
  }

  const isBaseType = (item: unknown) =>
    item === null || item === undefined || ['string', 'number', 'boolean'].includes(typeof item);

  if (Array.isArray(value)) {
    return (
      <ul className="list-disc list-inside">
        {value.map((item: unknown, idx: number) => {
          if (isBaseType(item)) {
            return (
              <li key={idx} className={p}>
                {String(item)}
              </li>
            );
          }

          return (
            <li key={idx} className={p}>
              <pre className="text-sm bg-muted p-2 rounded">{JSON.stringify(item, null, 2)}</pre>
            </li>
          );
        })}
      </ul>
    );
  }

  if (typeof value === 'object') {
    return <pre className="text-sm bg-muted p-2 rounded">{JSON.stringify(value, null, 2)}</pre>;
  }

  // primitive: string, number, boolean
  return <span className={p}>{String(value)}</span>;
};
