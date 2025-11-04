import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Panda } from 'lucide-react';

export const NotFoundPage = () => {
  const title = '404 — Page not found';
  const description = "We couldn't find the page you're looking for.";
  return (
    // Render centered content that fits the parent's content area without adding extra padding
    <div className="flex w-full flex-col h-full bg-background justify-items-center justify-center">
      <div className="w-full rounded-lg p-6 text-center">
        <div className="mb-6 flex items-center justify-center text-foreground/30">
          <Panda size={'24rem'} />
        </div>

        <h1 className="text-foreground/30 text-3xl font-bold mb-2">{title}</h1>
        <p className="mb-6 text-foreground/30">{description}</p>
        <div className="flex items-center justify-center gap-5 pt-6">
          <Button asChild variant={'ghost'} className="h-16 w-1/4">
            <Link to="/" className="font-semibold text-xl text-foreground/30">Back to home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
