
'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import RightPanel from '@/components/base/RightPanel';
import HeaderPanel from '@/components/base/HeaderPanel';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
import FiltersPopover from '@/components/base/FiltersPopover'; // ✅ Import it

export default function FullScreenMapPage() {
  const [mapKey, setMapKey] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    setMapKey((prev) => prev + 1);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <HeaderPanel 
        headerVisible={headerVisible} 
        setHeaderVisible={setHeaderVisible} 
      />
      <RightPanel headerVisible={headerVisible} />

      <FiltersPopover /> {/* ✅ Add Filters button */}


      <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
        <MapContainer
          key={mapKey}
          style={{ height: '100%', width: '100%' }}
          center={[51.505, -0.09]}
          zoom={13}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    </div>
  );
}