"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"

import dynamic from "next/dynamic"
const Map = dynamic(() => import("@/components/map"), { ssr: false });

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import {
  Utensils,
  Car,
  Users
} from "lucide-react"

// import { ToggleGroupDemo } from "@/components/dashboard/toggle-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MultiToggleGroup } from "@/components/dashboard/multi-toggle-group"
import FilterToggle from "@/components/dashboard/toggle-btn";
import { ThemeToggle } from "@/components/ui/theme-toggle"
const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards /> */}
              <div className="px-4 lg:px-6">
                <div className="mb-6">

                  {/* Card with Header and Map */}
                  <Card className="shadow-md border rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <h2 className="text-xl font-semibold">Map View</h2>
                      <FilterToggle />
                      {/* <MultiToggleGroup /> */}
                    </CardHeader>

                    <CardContent className="p-2 md:p-4">
                      <div className="w-full h-[500px] rounded-lg overflow-hidden">
                        <Map center={[25.276987, 55.296249]} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
