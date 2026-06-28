"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
    CreditCardIcon,
    InboxIcon,
    DashboardSquare01Icon,
    LibraryBig,
    Mic01Icon,
    Palette,
    LayoutDashboard,
} from "@hugeicons/core-free-icons";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail

} from "@workspace/ui/components/sidebar"
import { cn } from "@workspace/ui/lib/utils";

const customerSupportItems = [
    {
        title: "Conversations",
        url: "/conversations",
        icon: InboxIcon,
    },
    {
        title: "Knowledge Base",
        url: "/files",
        icon: LibraryBig,
    },
]

const configurationItems = [
    {
        title: "Widget Customization",
        url: "/customization",
        icon: Palette,
    },
    {
        title: "Integrations",
        url: "/integrations",
        icon: LayoutDashboard,
    },
    {
        title: "Voice",
        url: "/voice",
        icon: Mic01Icon,
    },
]

const accountItems = [
    {
        title: "Plan and Billing",
        url: "/billing",
        icon: CreditCardIcon,
    },
]

export const DashboardSidebar = () => {
    const pathname = usePathname();
    const isActive = (url: string) => {
        if (url === "/") {
            return pathname === "/"
        }
        return pathname.startsWith(url);
    }
    return (
        <Sidebar className="group" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size={"lg"}
                            render={
                                <OrganizationSwitcher
                                    hidePersonal
                                    skipInvitationScreen
                                    appearance={
                                        {
                                            elements: {
                                                rootBox: "w-full!",
                                                avatarBox: "size-6! rounded-sm!",
                                                organizationSwitcherTrigger: "w-full! justify-between! group-data-[collapsible=icon]:justify-center! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
                                                organizationPreview: "gap-2! group-data-[collapsible=icon]:justify-center!",
                                                organizationPreviewTextContainer: "group-data-[collapsible=icon]:hidden! text-xs! font-medium! text-sidebar-foreground!",
                                                organizationSwitcherTriggerIcon: "group-data-[collapsible=icon]:hidden! text-sidebar-foreground!"
                                            }
                                        }
                                    }
                                />
                            } />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* Customer Support */}
                <SidebarGroup>
                    <SidebarGroupLabel className="uppercase font-mono text-xs text-sidebar-foreground/50">Customer Support</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {customerSupportItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={isActive(item.url)}
                                        render={<Link href={item.url} />}
                                        className={cn(isActive(item.url) && "bg-linear-to-b from-sidebar-primary to-[#0b63f3]! text-sidebar-primary-foreground! hover:to-[#0b63f3]/90!")}
                                    >
                                        <HugeiconsIcon icon={item.icon} size={16} />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Configuration */}
                <SidebarGroup>
                    <SidebarGroupLabel className="uppercase font-mono text-xs text-sidebar-foreground/50">Configuration</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {configurationItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={isActive(item.url)}
                                        render={<Link href={item.url} />}
                                        className={cn(isActive(item.url) && "bg-linear-to-b from-sidebar-primary to-[#0b63f3]! text-sidebar-primary-foreground! hover:to-[#0b63f3]/90!")}
                                    >
                                        <HugeiconsIcon icon={item.icon} size={16} />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Account */}
                <SidebarGroup>
                    <SidebarGroupLabel className="uppercase font-mono text-xs text-sidebar-foreground/50">Account</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {accountItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={isActive(item.url)}
                                        render={<Link href={item.url} />}
                                        className={cn(isActive(item.url) && "bg-linear-to-b from-sidebar-primary to-[#0b63f3]! text-sidebar-primary-foreground! hover:to-[#0b63f3]/90!")}
                                    >
                                        <HugeiconsIcon icon={item.icon} size={16} />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <UserButton
                            showName
                            appearance={{
                                elements: {
                                    rootBox: "w-full! h-8!",
                                    userButtonTrigger: "w-full! p-2! hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground! group-data-[collapsible=icon]:p-2!",
                                    userButtonBox: "w-full! flex-row-reverse! justify-end! gap-2! group-data-[collapsible=icon]:justify-center! text-sidebar-foreground!",
                                    userButtonOuterIdentifier: "pl-0! group-data-[collapsible=icon]:hidden!",
                                    avatarBox: "size-6!"

                                }
                            }}
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}