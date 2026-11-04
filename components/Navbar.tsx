"use client"
import { Brand } from './Brand'
import { NavLinks } from '@/interfaces/nav-links.interface'
import { usePathname } from 'next/navigation'

export const Navbar = ({links} : {links: NavLinks[]}) => {
  const pathname = usePathname();

  return (
     <nav className="flex items-center gap-6 bg-gray-900 px-6 py-4 text-slate-300">
        <a href="/" className="mr-auto text-lg font-bold text-white">
          <Brand/>
        </a>
        {links ? links.map((link) => (
          <a 
          key={link.href} 
          href={link.href}
          className={pathname === link.href ? "font-bold text-white" : "hover:text-amber-400"}
          >
            {link.title}
          </a>
        )) : ""}
        
      </nav>
  )
}

