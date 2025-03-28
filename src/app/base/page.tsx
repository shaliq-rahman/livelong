'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ChevronUp, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { MapComponent } from '@/components/base/map'; // Import MapComponent

export default function FullScreenMapPage() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {headerVisible ? (
        <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 shadow-md">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">Map View</div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setHeaderVisible(false)}>
            <ChevronUp />
          </Button>
        </header>
      ) : (
        <div className="absolute z-40 top-2 left-1/2 transform -translate-x-1/2">
          <Button variant="ghost" size="icon" onClick={() => setHeaderVisible(true)}>
            <ChevronDown />
          </Button>
        </div>
      )}

      {/* Map Container */}
      <div
        className="absolute transition-all duration-300 z-10"
        style={{
          top: headerVisible ? '3.5rem' : '0',
          left: leftOpen ? '16rem' : '0',
          right: rightOpen ? '16rem' : '0',
          bottom: 0,
        }}
      >
        <MapComponent />
      </div>
    </div>
  );
}
