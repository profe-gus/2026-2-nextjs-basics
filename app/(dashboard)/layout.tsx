import { Sidebar } from '@/components/sidebar/Sidebar'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-slate-100 text-slate-900 md:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  )
}
