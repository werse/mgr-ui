import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION_LAYOUT } from '@/config';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

const collectUrlsToTitlesMap = (): Record<string, string> => {
  const resultMap: Record<string, string> = {};

  NAVIGATION_LAYOUT.navMain.forEach((group) => {
    resultMap[group.url] = group.title;
    group.items?.forEach((item) => {
      const fullUrl = `${group.url}${item.url}`;
      resultMap[fullUrl] = item.title;
    });
  });

  return resultMap;
};

const isUuid = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

const URL_TO_TITLE_MAP = collectUrlsToTitlesMap();

export const HeaderBreadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);

  const groupPath = `/${pathSegments[0] || ''}`;
  const groupName = URL_TO_TITLE_MAP[groupPath];
  const entityId = pathSegments.find((segment) => isUuid(segment));

  const handleCopy = () => {
    if (entityId) {
      navigator.clipboard.writeText(entityId);
      setShowCopiedTooltip(true);
      setTimeout(() => setShowCopiedTooltip(false), 500);
    }
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to={'/'}>Home</Link>
        </BreadcrumbItem>
        {groupName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={groupPath}>{groupName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {entityId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{entityId}</BreadcrumbPage>
              <Tooltip open={showCopiedTooltip}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon-sm" onClick={handleCopy}>
                    <Copy />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className={"gap-2"}>
                  <p>Id copied to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
