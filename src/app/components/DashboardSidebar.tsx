import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useSession } from "../lib/auth-client";

const menuItemsByRole = {
  Seeker: [],
  Recruiter: [],
  Admin: [],
};

export function DashboardSidebar() {
  const { data: session, isPending } = useSession();
  const role = session?.user?.role || "seeker";

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {
              // menuItemsByRole[role].map((item) => (
              // <SidebarMenuItem key={item.name}>
              //   <SidebarMenuButton render={<a href={item.url} />}>
              //     <item.icon />
              //     <span>{item.name}</span>
              //   </SidebarMenuButton>
              // </SidebarMenuItem>
              // ))
            }
          </SidebarMenu>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
