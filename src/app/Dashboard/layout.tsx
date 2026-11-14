import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { Toaster } from "@/components/ui/toast"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="min-w-0 flex-1 bg-[#111112]">
        <SidebarTrigger />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
};
export default DashboardLayout;
