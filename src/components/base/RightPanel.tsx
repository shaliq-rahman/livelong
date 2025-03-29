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
        <div className="absolute top-0 bottom-0 right-0 w-[32rem] z-20 bg-white shadow-md flex flex-col">
          <div className="p-4 font-semibold border-b text-gray-900">Status</div>
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
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
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
        <Button variant="outline" size="icon" onClick={() => setRightOpen((prev) => !prev)}>
          {rightOpen ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
    </>
  );
}
