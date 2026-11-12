import { MenuItem } from "@/interfaces/menu-item.interface";
import Link from "next/link";

type Props = MenuItem & { active?: boolean };
export function SidebarMenuItem({ path, icon, title, subtitle, active = false }: Props) {
    return (
        <Link
            href={path}
            aria-current={active ? "page" : undefined}
            className={`flex w-full items-center gap-3 border-b border-slate-700 px-2 py-3
transition-colors hover:bg-white/5 ${active ? "bg-blue-800/40" : ""
                }`}
        >
            <span className="text-xl text-blue-500">{icon}</span>
            <span className="flex flex-col">
                <span className="font-bold leading-5 text-white">{title}</span>
                <span className="hidden text-sm text-white/50 md:block">{subtitle}</span>
            </span>
        </Link>
    );
}