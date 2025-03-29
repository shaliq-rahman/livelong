// components/dashboard/right_panel.tsx

"use client"

import { SiteHeader } from "@/components/site-header"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import FilterToggle from "@/components/dashboard/toggle-btn"
import OrderTable from "@/components/dashboard/order-table"
import {
  TruckIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  MapIcon,
  TableIcon,
} from "lucide-react"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/map"), { ssr: false })

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

export default function RightPanel() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-0 z-50 bg-background border-b">
        <SiteHeader />
      </div>

      <div className="flex-1 flex flex-col h-full px-4 lg:px-6 py-4">
        <Tabs defaultValue="map" className="flex-1 flex flex-col h-full">
          <TabsList className="mb-4 flex gap-2 self-start">
            <TabsTrigger value="map">
              <MapIcon className="w-4 h-4 mr-1" /> Map
            </TabsTrigger>
            <TabsTrigger value="table">
              <TableIcon className="w-4 h-4 mr-1" /> Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="flex-1">
            <Card className="shadow-md border rounded-2xl h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h2 className="text-xl font-semibold">Map View</h2>
                <FilterToggle />
              </CardHeader>
              <CardContent className="p-2 md:p-4 flex-1">
                <div className="w-full h-full rounded-lg overflow-visible relative z-0">
                  <Map center={[25.276987, 55.296249]} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="table" className="flex-1 flex flex-col h-full">
            <Tabs defaultValue="pending" className="flex-1 flex flex-col h-full">
              <TabsList className="mb-4 flex gap-2 self-start">
                <TabsTrigger value="pending">
                  <ClockIcon className="w-4 h-4 mr-1" /> Pending
                </TabsTrigger>
                <TabsTrigger value="assigned">
                  <TruckIcon className="w-4 h-4 mr-1" /> Assigned
                </TabsTrigger>
                <TabsTrigger value="delivered">
                  <CheckCircleIcon className="w-4 h-4 mr-1" /> Delivered
                </TabsTrigger>
                <TabsTrigger value="cancelled">
                  <XCircleIcon className="w-4 h-4 mr-1" /> Cancelled
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="flex-1 flex flex-col h-[calc(100vh-260px)]">
                <OrderTable orders={dummyOrders.pending} />
              </TabsContent>
              <TabsContent value="assigned" className="flex-1 flex flex-col h-[calc(100vh-260px)]">
                <OrderTable orders={dummyOrders.assigned} />
              </TabsContent>
              <TabsContent value="delivered" className="flex-1 flex flex-col h-[calc(100vh-260px)]">
                <OrderTable orders={dummyOrders.delivered} />
              </TabsContent>
              <TabsContent value="cancelled" className="flex-1 flex flex-col h-[calc(100vh-260px)]">
                <OrderTable orders={dummyOrders.cancelled} />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
