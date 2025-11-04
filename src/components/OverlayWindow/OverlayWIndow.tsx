import { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { DynamicIcon } from 'lucide-react/dynamic';

export type Props = {
  open: boolean;
}

export const OverlayWindow = ({open}: Props) => {
  const [isOpen, setOpen] = useState(open);
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <Button onClick={() => setOpen(true)}>Open Image Overlay</Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-[90%] max-w-3xl">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2"
            >
              <DynamicIcon name="x" className="h-5 w-5" />
            </Button>

            <img
              src="https://picsum.photos/800/500"
              alt="Example"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}
