'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  User,
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);

const mockTasks = {
  assigned: ['Task 1', 'Task 2'],
  unassigned: ['Task 3'],
  completed: ['Task 4'],
};

const mockUsers = {
  free: ['Alice', 'Bob'],
  busy: ['Charlie'],
  inactive: ['Dave'],
};

export default function FullScreenMapPage() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mapKey, setMapKey] = useState(0);
  const [leftTab, setLeftTab] = useState<'assigned' | 'unassigned' | 'completed'>('assigned');
  const [rightTab, setRightTab] = useState<'free' | 'busy' | 'inactive'>('free');

  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [leftOpen, rightOpen, headerVisible]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {headerVisible ? (
        <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <div className="text-lg font-bold">Map View</div>
          <div className="flex gap-4 items-center">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Option A" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
                <SelectItem value="b">Option B</SelectItem>
                <SelectItem value="c">Option C</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Option 1" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
                <SelectItem value="2">Option 2</SelectItem>
                <SelectItem value="3">Option 3</SelectItem>
              </SelectContent>
            </Select>
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

      {/* Left Panel */}
      {leftOpen && (
        <div className="absolute top-0 bottom-0 left-0 w-64 z-20 bg-white shadow-md flex flex-col">
          <div className="p-4 border-b font-semibold">Tasks</div>
          <div className="flex">
            {['assigned', 'unassigned', 'completed'].map(tab => (
              <button
                key={tab}
                onClick={() => setLeftTab(tab as any)}
                className={`flex-1 py-2 text-sm border-b-2 ${
                  leftTab === tab ? 'border-blue-500 font-bold' : 'border-transparent'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="p-4 space-y-2 overflow-auto">
            {mockTasks[leftTab].map((task, i) => (
              <div key={i} className="bg-gray-100 rounded p-2 w-full text-sm">
                {task}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="absolute top-20 left-2 z-40">
        <Button variant="outline" size="icon" onClick={() => setLeftOpen(prev => !prev)}>
          {leftOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>

      {/* Right Panel */}
      {rightOpen && (
        <div className="absolute top-0 bottom-0 right-0 w-64 z-20 bg-white shadow-md flex flex-col">
          <div className="p-4 border-b font-semibold">Status</div>
          <div className="flex">
            {(['free', 'busy', 'inactive'] as const).map(status => (
              <button
                key={status}
                onClick={() => setRightTab(status)}
                className={`flex-1 py-2 text-sm border-b-2 ${
                  rightTab === status ? 'border-blue-500 font-bold' : 'border-transparent'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({mockUsers[status].length})
              </button>
            ))}
          </div>
          <div className="p-4 space-y-2 overflow-auto">
            {mockUsers[rightTab].map((user, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-gray-100 rounded p-2 w-full text-sm"
              >
                <User className="w-4 h-4" />
                {user}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="absolute top-20 right-2 z-40">
        <Button variant="outline" size="icon" onClick={() => setRightOpen(prev => !prev)}>
          {rightOpen ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      {/* Map */}
      <div
        className="absolute transition-all duration-300 z-10"
        style={{
          top: headerVisible ? '3.5rem' : '0',
          left: leftOpen ? '16rem' : '0',
          right: rightOpen ? '16rem' : '0',
          bottom: 0,
        }}
      >
        <MapContainer
          key={mapKey}
          center={[25.276987, 55.296249]}
          zoom={13}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
}
