"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import FilterToggle from "@/components/dashboard/toggle-btn"
import OrderTable from "@/components/dashboard/order-table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { TruckIcon, ClockIcon, CheckCircleIcon, XCircleIcon, MapIcon, ListIcon } from "lucide-react"

const Map = dynamic(() => import("@/components/map"), { ssr: false });

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
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="sticky top-0 z-50 bg-background border-b">
          <SiteHeader />
        </div>

        <div className="flex flex-1 flex-col px-4 lg:px-6 py-6">
          <Tabs defaultValue="map" className="w-full">
            {/* Top level tabs for switching views */}
            <TabsList className="mb-6 flex gap-2">
              <TabsTrigger value="map"><MapIcon className="w-4 h-4 mr-1" /> Map View</TabsTrigger>
              <TabsTrigger value="orders"><ListIcon className="w-4 h-4 mr-1" /> Orders</TabsTrigger>
            </TabsList>

            {/* --- MAP TAB --- */}
            <TabsContent value="map">
              <Card className="shadow-md border rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <h2 className="text-xl font-semibold">Map View</h2>
                  <FilterToggle />
                </CardHeader>
                <CardContent className="p-2 md:p-4">
                  <div className="w-full h-[500px] rounded-lg overflow-hidden relative z-0">
                     <Map center={[25.276987, 55.296249]} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* --- ORDERS TAB --- */}
            <TabsContent value="orders">
              <Tabs defaultValue="pending" className="w-full mt-6">
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
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
