'use client';

import { useState } from "react";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function FilterToggle() {
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <div className="flex items-center justify-end">
      {/* Desktop Button Group */}
      <ToggleGroup
        type="multiple"
        value={filters}
        onValueChange={setFilters}
        variant="outline"
        className="hidden md:flex flex-wrap p-2"
      >
        <ToggleGroupItem
          value="restaurants"
          className="min-w-[110px] justify-center"
        >
          Restaurants
        </ToggleGroupItem>
        <ToggleGroupItem
          value="drivers"
          className="min-w-[110px] justify-center"
        >
          Drivers
        </ToggleGroupItem>
        <ToggleGroupItem
          value="vehicles"
          className="min-w-[110px] justify-center"
        >
          Vehicles
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Mobile Dropdown */}
      <Select
        value={filters[0] || ""}
        onValueChange={(val) => setFilters([val])}
      >
        <SelectTrigger
          className="w-40 md:hidden"
          size="sm"
          aria-label="Select filter"
        >
          <SelectValue placeholder="Select a filter" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="restaurants">Restaurants</SelectItem>
          <SelectItem value="drivers">Drivers</SelectItem>
          <SelectItem value="vehicles">Vehicles</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
