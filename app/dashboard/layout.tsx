'use client'

import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useKeyboardShortcuts()

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
