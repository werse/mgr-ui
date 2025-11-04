import { useLocation } from 'react-router-dom';
import { p, h1 } from '@/lib/typography.ts';

export const DeploymentsPage = () => {
  const location = useLocation();
  const title = 'Tenants Main Page';
  return (
    <div className="p-6 select-text">
      <h1 className={`${h1} select-none`}>{title}</h1>
      <p className={p}>{location.pathname}.</p>
      <p className={p}>There will be a table with corresponding tenants, their statuses, etc</p>
    </div>
  );
};
