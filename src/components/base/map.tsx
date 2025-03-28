'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Lazy load Map components
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);

export default function FullScreenMapPage() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [leftOpen, rightOpen]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-100">
      {/* Left Sheet */}
      <Sheet open={leftOpen} onOpenChange={setLeftOpen}>
        <SheetTrigger asChild>
          <Button
            className="absolute left-2 top-2 z-20"
            variant="secondary"
            size="icon"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <h2 className="text-lg font-semibold mb-4">Left Panel</h2>
          <p>Some content here...</p>
        </SheetContent>
      </Sheet>

      {/* Right Sheet */}
      <Sheet open={rightOpen} onOpenChange={setRightOpen}>
        <SheetTrigger asChild>
          <Button
            className="absolute right-2 top-2 z-20"
            variant="secondary"
            size="icon"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <h2 className="text-lg font-semibold mb-4">Right Panel</h2>
          <p>Additional tools or info here...</p>
        </SheetContent>
      </Sheet>

      {/* Map Container */}
      <div
        className="absolute top-0 bottom-0 transition-all duration-300 z-0"
        style={{
          left: leftOpen ? '16rem' : '3.5rem', // 64px = 16rem, 3.5rem = 56px
          right: rightOpen ? '16rem' : '3.5rem',
        }}
      >
        <MapContainer
          key={mapKey}
          center={[25.276987, 55.296249]}
          zoom={12}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
}
