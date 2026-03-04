import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { Calendar, Timer } from 'lucide-react';

dayjs.extend(isSameOrAfter);

interface Props {
  startedAt: string;
  finishedAt: string;
}

const formatStartDate = (dateStr: string): string => {
  const d = dayjs(dateStr);
  const today = dayjs().startOf('day');

  if (d.isSame(today, 'day')) return 'Today';
  if (d.isSame(today.subtract(1, 'day'), 'day')) return 'Yesterday';
  if (d.isSameOrAfter(today.startOf('week').add(1, 'day'))) return d.format('dddd');

  return d.format('DD MMM YYYY');
};

const formatDuration = (startedAt: string, finishedAt: string): string => {
  const ms = dayjs(finishedAt).diff(dayjs(startedAt));
  if (ms < 0) return '—';
  const totalSeconds = Math.floor(ms / 1000);
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes < 60) return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const FlowTiming = ({ startedAt, finishedAt }: Props) => {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span className="text-sm font-medium">{formatStartDate(startedAt)}</span>
      </div>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Timer className="h-3.5 w-3.5 shrink-0" />
        <span className="text-xs">{formatDuration(startedAt, finishedAt)}</span>
      </div>
    </div>
  );
};
