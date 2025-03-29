'use client';

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

const FILTER_ITEMS = [
  { id: 'bike_routes', label: 'Bike Routes' },
  { id: 'construction', label: 'Construction Zones' },
  { id: 'weather', label: 'Weather Overlay' },
  { id: 'satellite', label: 'Satellite View' },
  { id: 'traffic', label: 'Live Traffic' },
];

export default function FiltersPopover() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="absolute bottom-20 left-4 z-30">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="bg-black text-white rounded-xl px-4 py-2 shadow-md hover:bg-neutral-800 transition">
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="bg-black text-white rounded-2xl p-4 w-64 space-y-4 border border-neutral-700">
          <div className="space-y-2">
            {FILTER_ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between hover:bg-neutral-800 p-2 rounded-lg transition"
              >
                <span className="text-sm">{item.label}</span>
                <Checkbox
                  checked={selectedFilters.includes(item.id)}
                  onCheckedChange={() => toggleFilter(item.id)}
                />
              </div>
            ))}
          </div>
          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full bg-neutral-800 text-white hover:bg-neutral-700"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
