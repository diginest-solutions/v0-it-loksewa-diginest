'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  BarChart3,
  BookOpen,
  Zap,
  TrendingUp,
  Users,
  FileText,
  User,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const sidebarItems = [
  { label: 'Dashboard', href: '/dashboard', icon: BarChart3, shortcut: 'D' },
  { label: 'Question Bank', href: '/dashboard/question-bank', icon: BookOpen, shortcut: 'Q' },
  { label: 'Mock Tests', href: '/dashboard/mock-tests', icon: Zap, shortcut: 'M' },
  { label: 'Performance', href: '/dashboard/performance', icon: TrendingUp, shortcut: null },
  { label: 'Leaderboard', href: '/dashboard/leaderboard', icon: Users, shortcut: null },
  { label: 'Notes', href: '/dashboard/notes', icon: FileText, shortcut: null },
  { label: 'Profile', href: '/dashboard/profile', icon: User, shortcut: null },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 overflow-y-auto z-40',
          'md:static md:translate-x-0 md:z-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
            IT Prep
          </h1>
          <p className="text-xs text-slate-500 mt-1">Loksewa Smart Preparation</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item, idx) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.shortcut && (
                    <Badge variant="secondary" className="text-xs">
                      {item.shortcut}
                    </Badge>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-gradient-to-t from-slate-950 to-transparent">
          <p className="text-xs text-slate-500 text-center">
            Press <span className="font-mono bg-slate-800 px-2 py-1 rounded">Q</span> <span className="font-mono bg-slate-800 px-2 py-1 rounded">M</span> <span className="font-mono bg-slate-800 px-2 py-1 rounded">D</span> for shortcuts
          </p>
        </div>
      </motion.div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
