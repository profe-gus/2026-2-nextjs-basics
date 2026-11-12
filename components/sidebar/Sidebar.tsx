import { students } from "@/data/students.mock";
import { MenuItem } from "@/interfaces/menu-item.interface";
import { all } from "axios";
import Link from "next/link";
import { Suspense } from "react";
import { Brand } from "../Brand";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { IoPeopleOutline, IoCheckmarkCircleOutline, IoWomanOutline } from "react-icons/io5";

const menuItems: MenuItem[] = [
    {
        path: "/students", icon: <IoPeopleOutline />, title: "Estudiantes", subtitle: "Administrador de estudiantes"
    },
    {
        path: "/counter", icon: <IoCheckmarkCircleOutline />, title: "Contador", subtitle: "Ejemplo simple de SSR" 
    },
    
];
export function Sidebar() {
    return (
        <>
            {/* Mobile: compact top bar */}
            <header className="flex gap-4 overflow-x-auto bg-gray-900 p-4 text-sm text-slate-300
md:hidden">
                <Link href="/" className="whitespace-nowrap text-white">
                    <Brand />
                </Link>
                {menuItems.map((item) => (
                    <Link key={item.path} href={item.path} className="whitespace-nowrap hover:text-white">
                        {item.title}
                    </Link>
                ))}
            </header>
            {/* Desktop (md+): sidebar like the 2026-1 DashStudents app */}
            <aside className="hidden w-72 shrink-0 flex-col overflow-y-auto bg-gray-900 text-slate-300 md:flex">
                <div className="px-6 py-8">
                    <Link href="/" className="text-2xl text-white">
                        <Brand />
                    </Link>
                    <p className="text-sm text-slate-500">Administrador de estudiantes</p>
                </div>
                <nav className="w-full px-6">
                    <Suspense
                        fallback={menuItems.map((item) => (
                            <SidebarMenuItem key={item.path} {...item} />
                        ))}
                    >
                        <SidebarMenu items={menuItems} />
                    </Suspense>
                </nav>
            </aside>
        </>
    );
}