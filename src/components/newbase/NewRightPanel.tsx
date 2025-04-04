'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  MessageCircle,
  Search,
  ClipboardList,
  X,
} from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface RightPanelProps {
  headerVisible: boolean;
}

const mockUsers = {
  free: [
    { id: 1, name: 'Alice Smith', mobile: '9876543210', tasks: 5 },
    { id: 2, name: 'Bob Johnson', mobile: '9876543211', tasks: 3 },
  ],
  busy: [{ id: 3, name: 'Charlie Brown', mobile: '9876543212', tasks: 2 }],
  inactive: [{ id: 4, name: 'Dave Wilson', mobile: '9876543213', tasks: 0 }],
};

const mockTasks = [
  { id: 1, description: 'Follow up with client' },
  { id: 2, description: 'Update customer records' },
  { id: 3, description: 'Prepare sales report' },
];

export default function RightPanel({ headerVisible }: RightPanelProps) {
  const [message, setMessage] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMessageUserId, setOpenMessageUserId] = useState<number | null>(null);
  const [openTasksUserId, setOpenTasksUserId] = useState<number | null>(null);
  const [openPanel, setOpenPanel] = useState(false);

  const filteredUsers = (users: typeof mockUsers.free) =>
    users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobile.includes(searchQuery)
    );

  const handleSendMessage = () => {
    setMessage('');
    setOpenMessageUserId(null);
  };

  return (
    <div className="fixed top-20 right-4 z-50">
      <Popover open={openPanel} onOpenChange={setOpenPanel}>
        <PopoverTrigger asChild>
          <Button className="bg-black text-white rounded-xl px-4 py-2 shadow-md hover:bg-neutral-800 transition">
            Open Agents
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="rounded-2xl p-4 w-[32rem] max-h-[90vh] overflow-auto border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black text-black dark:text-white"
        >
          <div className="flex items-center justify-between mb-4">
            {showSearch ? (
              <div className="flex items-center gap-2 w-full">
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white border border-neutral-300 dark:border-neutral-700"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSearch(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold">Agents</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSearch(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          <Tabs defaultValue="free" className="w-full">
            <TabsList className="grid grid-cols-3 w-full bg-neutral-100 dark:bg-neutral-900 rounded-xl mb-2 text-black dark:text-white">
              {Object.entries(mockUsers).map(([status, users]) => (
                <TabsTrigger
                key={status}
                value={status}
                className="data-[state=active]:bg-[oklch(1_0_0)] dark:data-[state=active]:bg-neutral-700 rounded-xl px-3 py-1"
              >
                  <span className="capitalize">{status}</span>
                  <span className="ml-1 text-neutral-500">({users.length})</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(mockUsers).map(([status, users]) => (
              <TabsContent key={status} value={status}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="text-right">Tasks</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers(users).map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {user.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium">{user.name}</span>
                              <span className="text-sm text-neutral-500">
                                {status === 'inactive' ? 'Inactive' : 'Active'}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-neutral-500">
                          {user.mobile}
                        </TableCell>
                        <TableCell className="text-right">
                          <Popover
                            open={openTasksUserId === user.id}
                            onOpenChange={(open) =>
                              setOpenTasksUserId(open ? user.id : null)
                            }
                          >
                            <PopoverTrigger asChild>
                              <Button variant="ghost" className="gap-2">
                                <ClipboardList className="h-4 w-4" />
                                {user.tasks} Tasks
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black text-black dark:text-white">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Task Description</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {mockTasks.map((task) => (
                                    <TableRow key={task.id}>
                                      <TableCell>{task.id}</TableCell>
                                      <TableCell>{task.description}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                        <TableCell>
                          <Popover
                            open={openMessageUserId === user.id}
                            onOpenChange={(open) =>
                              setOpenMessageUserId(open ? user.id : null)
                            }
                          >
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black text-black dark:text-white">
                              <div className="grid gap-4">
                                <Input
                                  placeholder="Type your message..."
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
                                />
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    variant="outline"
                                    className="border border-neutral-300 dark:border-neutral-700"
                                    onClick={() => setOpenMessageUserId(null)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button onClick={handleSendMessage}>Send</Button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
}
