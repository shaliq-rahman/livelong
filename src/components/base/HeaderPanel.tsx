'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronUp, ChevronDown, LayoutList, Map, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface HeaderPanelProps {
  headerVisible: boolean;
  setHeaderVisible: (visible: boolean) => void;
}

export default function HeaderPanel({ 
  headerVisible, 
  setHeaderVisible 
}: HeaderPanelProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {headerVisible ? (
        <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-background shadow-md">
          <div className="text-lg font-bold">Map View</div>

          <Tabs defaultValue="map">
            <TabsList className="bg-muted">
              <TabsTrigger value="list" className="flex items-center gap-1">
                <LayoutList className="h-4 w-4" />
                <span>List</span>
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-1">
                <Map className="h-4 w-4" />
                <span>Map</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setHeaderVisible(false)}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
        </header>
      ) : (
        <div className="absolute z-40 top-2 left-1/2 -translate-x-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setHeaderVisible(true)}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}