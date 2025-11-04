import { createSearchParams, type To, useLocation, useNavigate } from 'react-router-dom';

export const useNavigateWithParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (params: Record<string, string>) => {
    const path: To = {
      pathname: location.pathname,
      search: createSearchParams(params).toString(),
    };
    navigate(path);
  };
};
