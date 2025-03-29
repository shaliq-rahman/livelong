'use client';

import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type RightToggleProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function RightToggle({ isOpen, onClick }: RightToggleProps) {
  return (
    <div className="absolute top-20 right-2 z-40">
      <Button variant="outline" size="icon" onClick={onClick}>
        {isOpen ? <ChevronRight /> : <ChevronLeft />}
      </Button>
    </div>
  );
}
