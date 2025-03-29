/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronRight, ChevronLeft, MessageCircle, Search, ClipboardList, X } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const mockUsers = {
  free: [
    { id: 1, name: 'Alice Smith', mobile: '9876543210', tasks: 5 },
    { id: 2, name: 'Bob Johnson', mobile: '9876543211', tasks: 3 },
  ],
  busy: [{ id: 3, name: 'Charlie Brown', mobile: '9876543212', tasks: 2 }],
  inactive: [{ id: 4, name: 'Dave Wilson', mobile: '9876543213', tasks: 0 }],
};

const mockTasks = [
  { id: 1, description: "Follow up with client" },
  { id: 2, description: "Update customer records" },
  { id: 3, description: "Prepare sales report" },
];

export default function RightPanel() {
  const [rightOpen, setRightOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMessageUserId, setOpenMessageUserId] = useState<number | null>(null);
  const [openTasksUserId, setOpenTasksUserId] = useState<number | null>(null);

  const handleSendMessage = () => {
    setMessage('');
    setOpenMessageUserId(null);
  };

  const filteredUsers = (users: typeof mockUsers.free) => 
    users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobile.includes(searchQuery)
    );

  return (
    <>
      {rightOpen && (
        <div className="absolute top-0 bottom-0 right-0 w-[32rem] z-20 bg-background shadow-md flex flex-col border-l rounded-l-lg">
          {/* Header Section */}
          <div className="flex items-center justify-between p-4 border-b rounded-tl-lg bg-muted/10">
            {showSearch ? (
              <div className="flex items-center gap-2 w-full">
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                <Button variant="ghost" size="icon" onClick={() => setShowSearch(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-foreground">Agents</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
                  <Search className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="free" className="w-full">
            <TabsList className="grid grid-cols-3 w-full rounded-none">
              {Object.entries(mockUsers).map(([status, users]) => (
                <TabsTrigger 
                  key={status} 
                  value={status} 
                  className="flex gap-2 rounded-none"
                >
                  <span className="capitalize">{status}</span>
                  <span className="text-muted-foreground">({users.length})</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(mockUsers).map(([status, users]) => (
              <TabsContent key={status} value={status} className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60%]">Agent</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="text-right">Tasks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers(users).map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium">{user.name}</span>
                              <span className="text-sm text-muted-foreground">
                                {status === 'inactive' ? 'Inactive' : 'Active'}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.mobile}
                        </TableCell>
                        <TableCell className="text-right">
                          <Popover
                            open={openTasksUserId === user.id}
                            onOpenChange={(open) => setOpenTasksUserId(open ? user.id : null)}
                          >
                            <PopoverTrigger asChild>
                              <Button variant="ghost" className="gap-2">
                                <ClipboardList className="h-4 w-4" />
                                {user.tasks} Tasks
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
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
                            onOpenChange={(open) => setOpenMessageUserId(open ? user.id : null)}
                          >
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <div className="grid gap-4">
                                <Input
                                  placeholder="Type your message..."
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                />
                                <div className="flex gap-2 justify-end">
                                  <Button 
                                    variant="outline" 
                                    onClick={() => setOpenMessageUserId(null)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button onClick={handleSendMessage}>
                                    Send
                                  </Button>
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
        </div>
      )}

      <div className="absolute top-1/2 right-2 z-40 -translate-y-1/2">
        <Button 
          variant="ghost"
          size="icon"
          onClick={() => setRightOpen((prev) => !prev)}
          className="text-foreground hover:bg-accent rounded-full"
        >
          {rightOpen ? (
            <ChevronRight className="h-4 w-4 stroke-current" />
          ) : (
            <ChevronLeft className="h-4 w-4 stroke-current" />
          )}
        </Button>
      </div>
    </>
  );
}