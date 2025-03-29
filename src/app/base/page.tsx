'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronUp, ChevronDown, ChevronRight, ChevronLeft, User, MessageCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle'; // Import ThemeToggle
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import 'leaflet/dist/leaflet.css';
import { AvatarImage } from '@/components/ui/avatar';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

// Define the User type for messageUser state
type User = {
  id: number;
  name: string;
  phone: string;
  status: string;
  avatar: string;
};

const mockTasks = {
  assigned: ['Task 1', 'Task 2'],
  unassigned: ['Task 3'],
  completed: ['Task 4'],
};

const mockUsers = {
  free: [
    { id: 1, name: 'Alice', phone: '123-456-7890', status: 'active', avatar: 'avatar_url' },
    { id: 2, name: 'Bob', phone: '987-654-3210', status: 'inactive', avatar: 'avatar_url' },
  ],
  busy: [{ id: 3, name: 'Charlie', phone: '555-555-5555', status: 'active', avatar: 'avatar_url' }],
  inactive: [{ id: 4, name: 'Dave', phone: '111-222-3333', status: 'inactive', avatar: 'avatar_url' }],
};

export default function FullScreenMapPage() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [messageUser, setMessageUser] = useState<User | null>(null); // The state can be either a User object or null
  const [message, setMessage] = useState<string>(''); // To hold the message

  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [leftOpen, rightOpen, headerVisible]);

  // Handle dialog for sending message
  const handleSendMessage = () => {
    if (messageUser && message) {
      // Logic to send the message
      alert(`Message sent to ${messageUser.name}: ${message}`);
      setMessage(''); // Clear message after sending
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {headerVisible ? (
        <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 shadow-md">
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button (Left End of Header) */}
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
                    {users.map((user) => (
                      <TableRow key={user.id} onClick={() => setMessageUser(user)}>
                        <TableCell className="flex items-center gap-2">
                          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <span
                              className={`ml-2 rounded-full py-1 px-2 text-xs ${
                                user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                              } text-white`}
                            >
                              {user.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                          </div>
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
      <div className="absolute top-20 right-2 z-40">
        <Button variant="outline" size="icon" onClick={() => setRightOpen(prev => !prev)}>
          {rightOpen ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      {/* Map Container */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
        <MapContainer key={mapKey} style={{ height: '100%', width: '100%' }} center={[51.505, -0.09]} zoom={13}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>

      {/* Dialog for sending message */}
      <Dialog open={messageUser !== null} onOpenChange={(open) => open || setMessageUser(null)}>
        <DialogTrigger />
        <DialogContent>
          <DialogTitle>
            <VisuallyHidden>Send a message to {messageUser?.name}</VisuallyHidden>
          </DialogTitle>
          <h3 className="text-lg font-semibold">Message {messageUser?.name}</h3>
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex gap-2 mt-3">
            <Button variant="outline" onClick={() => setMessageUser(null)}>Close</Button>
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
