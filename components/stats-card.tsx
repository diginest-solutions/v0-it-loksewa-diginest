'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface StatsCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  color: 'indigo' | 'blue' | 'emerald' | 'amber'
  loading?: boolean
}

const colorClasses = {
  indigo: 'from-indigo-500/10 to-indigo-600/5 border-indigo-500/20',
  blue: 'from-blue-500/10 to-blue-600/5 border-blue-500/20',
  emerald: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20',
  amber: 'from-amber-500/10 to-amber-600/5 border-amber-500/20',
}

const iconBgColors = {
  indigo: 'bg-indigo-500/20 text-indigo-300',
  blue: 'bg-blue-500/20 text-blue-300',
  emerald: 'bg-emerald-500/20 text-emerald-300',
  amber: 'bg-amber-500/20 text-amber-300',
}

export function StatsCard({ label, value, icon: Icon, color, loading }: StatsCardProps) {
  if (loading) {
    return (
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-8 w-16" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-6 rounded-xl border bg-gradient-to-br ${colorClasses[color]} hover:border-opacity-100 transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 font-medium">{label}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${iconBgColors[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  )
}
