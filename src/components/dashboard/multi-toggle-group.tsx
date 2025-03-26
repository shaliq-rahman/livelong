"use client"

import { useState, useEffect } from "react"
import { Utensils, Car, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const options = [
  { value: "restaurants", label: "Restaurants", icon: <Utensils className="h-4 w-4 mr-1" /> },
  { value: "drivers", label: "Drivers", icon: <Car className="h-4 w-4 mr-1" /> },
  { value: "customers", label: "Customers", icon: <Users className="h-4 w-4 mr-1" /> },
]

export function MultiToggleGroup() {
  const [selected, setSelected] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive breakpoint
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleOption = (value: string) => {
    setSelected(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    )
  }

  return (
    <div>
      {isMobile ? (
        <select
          multiple
          value={selected}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, (option) => option.value)
            setSelected(values)
          }}
          className="border border-black rounded-md p-2 w-full text-sm"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="flex gap-2 border border-black rounded-lg p-1 bg-white">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleOption(opt.value)}
              className={cn(
                "flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors",
                selected.includes(opt.value)
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              )}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
