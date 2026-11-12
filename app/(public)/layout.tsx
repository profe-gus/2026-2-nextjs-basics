import { Navbar } from '@/components/Navbar'
import { NavLinks } from '@/interfaces/nav-links.interface';
import React from 'react'

export const NAV_LINKS: NavLinks[] = [
  { href: "/", title: "Home" },
  { href: "/students", title: "Students" },
  { href: "/counter", title: "Counter" },
  { href: "/about", title: "About" },
];

export default function PublicLayout({children} : {children : React.ReactNode}) {
  return (
    <>
      <Navbar links={NAV_LINKS}/>
      <main className="mx-auto max-w-5xl p-6">{children}</main>
    </>
  )
}
