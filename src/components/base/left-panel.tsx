// components/dashboard/left_panel.tsx

"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export default function LeftPanel({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <AppSidebar variant="inset" />
      <SidebarInset>{children}</SidebarInset>
    </>
  )
}
