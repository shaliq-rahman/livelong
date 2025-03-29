'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const mockUsers = {
  free: [
    { id: 1, name: 'Alice', status: 'active' },
    { id: 2, name: 'Bob', status: 'inactive' },
  ],
  busy: [{ id: 3, name: 'Charlie', status: 'active' }],
  inactive: [{ id: 4, name: 'Dave', status: 'inactive' }],
};

export default function RightPanel() {
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <>
      {rightOpen && (
        <div className="absolute top-0 bottom-0 right-0 w-[32rem] z-20 bg-background shadow-md flex flex-col border-l">
          <div className="p-4 font-semibold border-b text-foreground">Status</div>
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
                      <TableHead className="text-foreground">User</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="text-foreground">{user.name}</TableCell>
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
          className="text-foreground hover:bg-accent"
        >
          {rightOpen ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </>
  );
}