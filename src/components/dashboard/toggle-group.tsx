import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Utensils, Car, Users } from "lucide-react"

export function ToggleGroupDemo() {
  return (
    <ToggleGroup
      type="single"
      className="border border-black rounded-md bg-white p-1"
    >
      <ToggleGroupItem
        value="restaurants"
        aria-label="Toggle Restaurants"
        className="text-black px-4 py-2 rounded-md data-[state=on]:bg-black data-[state=on]:text-white transition"
      >
        <Utensils className="h-4 w-4 mr-1" />
        Restaurants
      </ToggleGroupItem>

      <ToggleGroupItem
        value="drivers"
        aria-label="Toggle Drivers"
        className="text-black px-4 py-2 rounded-md data-[state=on]:bg-black data-[state=on]:text-white transition"
      >
        <Car className="h-4 w-4 mr-1" />
        Drivers
      </ToggleGroupItem>

      <ToggleGroupItem
        value="customers"
        aria-label="Toggle Customers"
        className="text-black px-4 py-2 rounded-md data-[state=on]:bg-black data-[state=on]:text-white transition"
      >
        <Users className="h-4 w-4 mr-1" />
        Customers
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
