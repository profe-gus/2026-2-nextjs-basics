"use client"
import { MenuItem } from "@/interfaces/menu-item.interface";
import { usePathname } from "next/navigation";
import { SidebarMenuItem } from "./SidebarMenuItem";

export function SidebarMenu({ items }: { items: MenuItem[] }) {
    const pathname = usePathname();
    return (
        <>
            {items.map((item) => (
                <SidebarMenuItem key={item.path} {...item} active={pathname === item.path} />
            ))}
        </>
    );
}