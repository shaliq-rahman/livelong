'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import RightPanel from '@/components/base/RightPanel';
import HeaderPanel from '@/components/base/HeaderPanel';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });
import FiltersPopover from '@/components/base/FiltersPopOver';

// Kuwait coordinates (Kuwait City)
const KUWAIT_CENTER: [number, number] = [29.3759, 47.9774];

// Sample data points for Kuwait
const locations = [
  {
    name: "Kuwait City",
    position: [29.3759, 47.9774] as [number, number],
    description: "Capital City"
  },
  {
    name: "Al Ahmadi",
    position: [29.0769, 48.0838] as [number, number],
    description: "Oil Industry Center"
  },
  {
    name: "Al Jahra",
    position: [29.3375, 47.6581] as [number, number],
    description: "Agricultural Area"
  }
];

export default function FullScreenMapPage() {
  const [mapKey, setMapKey] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    // Load compatibility after component mounts (client-side only)
    import('leaflet-defaulticon-compatibility')
      .then(() => import('leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'));
      
    setMapKey((prev) => prev + 1);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <HeaderPanel 
        headerVisible={headerVisible} 
        setHeaderVisible={setHeaderVisible} 
      />
      <RightPanel headerVisible={headerVisible} />
      <FiltersPopover />

      <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
        <MapContainer
          key={mapKey}
          style={{ height: '100%', width: '100%' }}
          center={KUWAIT_CENTER}
          zoom={10}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Plot markers */}
          {locations.map((location, index) => (
            <Marker key={index} position={location.position}>
              <Popup>
                <div className="font-bold">{location.name}</div>
                <div>{location.description}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}