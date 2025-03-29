'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type LeftToggleProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function LeftToggle({ isOpen, onClick }: LeftToggleProps) {
  return (
    <div className="absolute top-20 left-2 z-40">
      <Button variant="outline" size="icon" onClick={onClick}>
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>
    </div>
  );
}
