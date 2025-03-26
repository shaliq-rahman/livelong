"use client";

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

import { Utensils, Users, Car } from "lucide-react";

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
        className="hidden md:flex border border-input rounded-lg overflow-hidden"
      >
        <ToggleGroupItem
          value="restaurants"
          className="min-w-[130px] justify-center gap-2 rounded-none"
        >
          <Utensils className="w-4 h-4" />
          Restaurants
        </ToggleGroupItem>
        <ToggleGroupItem
          value="drivers"
          className="min-w-[130px] justify-center gap-2 rounded-none"
        >
          <Users className="w-4 h-4" />
          Drivers
        </ToggleGroupItem>
        <ToggleGroupItem
          value="vehicles"
          className="min-w-[130px] justify-center gap-2 rounded-none"
        >
          <Car className="w-4 h-4" />
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
          <SelectItem value="restaurants" className="flex gap-2 items-center">
            <Utensils className="w-4 h-4" />
            Restaurants
          </SelectItem>
          <SelectItem value="drivers" className="flex gap-2 items-center">
            <Users className="w-4 h-4" />
            Drivers
          </SelectItem>
          <SelectItem value="vehicles" className="flex gap-2 items-center">
            <Car className="w-4 h-4" />
            Vehicles
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
