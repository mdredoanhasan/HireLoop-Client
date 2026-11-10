"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Banknote,
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  PlusCircleIcon,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useSession } from "../lib/auth-client";
type Role = "seeker" | "recruiter" | "admin";

type MenuItem = {
  name: string;
  url: string;
  icon: LucideIcon;
};
const menuItemsByRole: Record<Role, MenuItem[]> = {
  seeker: [
    { name: "Dashboard", url: "/Dashboard/seeker", icon: LayoutDashboard },
    { name: "Jobs", url: "/Dashboard/seeker/jobs", icon: Briefcase },
    { name: "Saved Jobs", url: "/Dashboard/seeker/saved-jobs", icon: Bookmark },
    { name: "Applications", url: "/Dashboard/seeker/applications", icon: FileText },
    { name: "Billing", url: "/Dashboard/seeker/billing", icon: Banknote },
    { name: "Settings", url: "/Dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { name: "Dashboard", url: "/Dashboard/recruiter", icon: LayoutDashboard },
    { name: "Manage Jobs", url: "/Dashboard/recruiter/jobs", icon: Briefcase },
    { name: "Add Jobs", url: "/Dashboard/recruiter/jobs/new", icon: PlusCircleIcon },
    { name: "Applications", url: "/Dashboard/recruiter/applications", icon: FileText },
    { name: "Settings", url: "/Dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", url: "/Dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/Dashboard/admin/users", icon: Users },
    { name: "Companies", url: "/Dashboard/admin/companies", icon: Building2 },
    { name: "Jobs", url: "/Dashboard/admin/jobs", icon: Briefcase },
    { name: "Payments", url: "/Dashboard/admin/payments", icon: Banknote },
    { name: "Settings", url: "/Dashboard/admin/settings", icon: Settings },
  ],
};
export function DashboardSidebar() {
  const { data: session } = useSession();
  const role = session?.user?.role || "seeker";

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {(menuItemsByRole[role] ?? []).map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton render={<Link href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
