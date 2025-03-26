"use client"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"

import dynamic from "next/dynamic"
const Map = dynamic(() => import("@/components/map"), { ssr: false });

// import { ToggleGroupDemo } from "@/components/dashboard/toggle-group"
import { MultiToggleGroup } from "@/components/dashboard/multi-toggle-group"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FilterToggle from "@/components/dashboard/toggle-btn";
import OrderTable from "@/components/dashboard/order-table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { TruckIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"

const dummyOrders = {
  pending: [
    { id: 1, customer: "John Doe", date: "2025-03-25", total: "$30.00", status: "pending" },
    { id: 2, customer: "Alice Smith", date: "2025-03-25", total: "$42.00", status: "pending" },
  ],
  assigned: [
    { id: 3, customer: "Bob Lee", date: "2025-03-24", total: "$15.50", status: "assigned" },
  ],
  delivered: [
    { id: 4, customer: "Jane Doe", date: "2025-03-23", total: "$60.00", status: "delivered" },
  ],
  cancelled: [
    { id: 5, customer: "Mike Ross", date: "2025-03-22", total: "$12.00", status: "cancelled" },
  ]
}

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
                      <div className="w-full h-[500px] rounded-lg overflow-visible relative z-0">
                        {/* <Map center={[25.276987, 55.296249]} /> */}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              {/* <DataTable data={data} /> */}

              <Tabs defaultValue="pending" className="w-full mt-6 px-4 lg:px-6">
                <TabsList className="mb-4 flex gap-2">
                  <TabsTrigger value="pending"><ClockIcon className="w-4 h-4 mr-1" /> Pending</TabsTrigger>
                  <TabsTrigger value="assigned"><TruckIcon className="w-4 h-4 mr-1" /> Assigned</TabsTrigger>
                  <TabsTrigger value="delivered"><CheckCircleIcon className="w-4 h-4 mr-1" /> Delivered</TabsTrigger>
                  <TabsTrigger value="cancelled"><XCircleIcon className="w-4 h-4 mr-1" /> Cancelled</TabsTrigger>
                </TabsList>

                <TabsContent value="pending">
                  <OrderTable orders={dummyOrders.pending} />
                </TabsContent>
                <TabsContent value="assigned">
                  <OrderTable orders={dummyOrders.assigned} />
                </TabsContent>
                <TabsContent value="delivered">
                  <OrderTable orders={dummyOrders.delivered} />
                </TabsContent>
                <TabsContent value="cancelled">
                  <OrderTable orders={dummyOrders.cancelled} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
