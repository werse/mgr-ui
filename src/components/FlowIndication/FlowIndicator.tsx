import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';

interface Props {
  status: string;
}

const getFlowStatusColor = (status?: string): string => {
  if (!status) {
    return 'bg-gray-400';
  }

  switch (status.toLowerCase()) {
    case 'finished':
      return 'bg-green-500';
    case 'in_progress':
      return 'bg-yellow-500 animate-pulse';
    case 'failed':
    case 'cancellation_failed':
      return 'bg-red-500';
    case 'canceled':
      return 'bg-blue-500';
    default:
      return 'bg-gray-400';
  }
};

export const FlowIndicator = ({ status }: Props) => {
  return (
    <div className="flex items-center">
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <span aria-hidden className={`inline-block w-4 h-4 rounded-full mr-3 ${getFlowStatusColor(status)}`} />
        </TooltipTrigger>
        <TooltipContent side="bottom" className="uppercase">
          <p>{status}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
