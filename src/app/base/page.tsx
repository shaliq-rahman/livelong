'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';
import RightPanel from '@/components/base/RightPanel';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });

export default function FullScreenMapPage() {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    setMapKey((prev) => prev + 1);
  }, [headerVisible]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {headerVisible ? (
        <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <div className="text-lg font-bold">Map View</div>
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

      {/* Right panel imported here */}
      <RightPanel />

      <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
        <MapContainer key={mapKey} style={{ height: '100%', width: '100%' }} center={[51.505, -0.09]} zoom={13}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    </div>
  );
}
