import { useLocation } from 'react-router-dom';

export const ApplicationsPage = () => {
  const location = useLocation();
  const title = 'Entitlements Main Page';
  return (
    <div className="p-6 select-text">
      <h1 className="text-2xl font-semibold mb-4">{title}</h1>
      <p className="">{location.pathname}</p>
    </div>
  );
};
