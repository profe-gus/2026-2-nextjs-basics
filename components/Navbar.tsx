"use client"
import Link from 'next/link'
import { Brand } from './Brand'
import { NavLinks } from '@/interfaces/nav-links.interface'
import { usePathname } from 'next/navigation'
import { UserBadge } from './session/UserBadge'

export const Navbar = ({links} : {links: NavLinks[]}) => {
  const pathname = usePathname();

  return (
     <nav className="flex items-center gap-6 bg-gray-900 px-6 py-4 text-slate-300">
        <Link href="/" className="mr-auto text-lg font-bold text-white">
          <Brand/>
        </Link>
        {links ? links.map((link) => (
          <Link
          key={link.href}
          href={link.href}
          className={pathname === link.href ? "font-bold text-white" : "hover:text-amber-400"}
          >
            {link.title}
          </Link>
        )) : ""}
        <UserBadge/>
        
      </nav>
  )
}

