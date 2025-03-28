'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronUp, ChevronDown, ChevronRight, ChevronLeft, User } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

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

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Header with Theme Toggle */}
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

      {/* Left Sidebar (Tasks) */}
      {leftOpen && (
        <div className="absolute top-0 bottom-0 left-0 w-64 z-20 bg-white dark:bg-gray-800 shadow-md flex flex-col">
          <div className="p-4 font-semibold border-b dark:border-gray-700 text-gray-900 dark:text-gray-100">Tasks</div>
          <Tabs defaultValue="assigned" className="p-2">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="assigned">Assigned</TabsTrigger>
              <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            {Object.entries(mockTasks).map(([key, tasks]) => (
              <TabsContent key={key} value={key}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task, i) => (
                      <TableRow key={i}>
                        <TableCell>{task}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}

      {/* Left Sidebar Toggle Button */}
      <div className="absolute top-20 left-2 z-40">
        <Button variant="outline" size="icon" onClick={() => setLeftOpen(prev => !prev)}>
          {leftOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>

      {/* Right Sidebar (Users) */}
      {rightOpen && (
        <div className="absolute top-0 bottom-0 right-0 w-64 z-20 bg-white dark:bg-gray-800 shadow-md flex flex-col">
          <div className="p-4 font-semibold border-b dark:border-gray-700 text-gray-900 dark:text-gray-100">Status</div>
          <Tabs defaultValue="free" className="p-2">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="free">Free</TabsTrigger>
              <TabsTrigger value="busy">Busy</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            {Object.entries(mockUsers).map(([status, users]) => (
              <TabsContent key={status} value={status}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user, i) => (
                      <TableRow key={i}>
                        <TableCell className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {user}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}

      {/* Right Sidebar Toggle Button */}
      <div className="absolute top-20 right-2 z-40">
        <Button variant="outline" size="icon" onClick={() => setRightOpen(prev => !prev)}>
          {rightOpen ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

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
        <MapContainer center={[25.276987, 55.296249]} zoom={13} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
}
