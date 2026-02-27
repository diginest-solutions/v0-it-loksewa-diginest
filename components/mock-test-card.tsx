'use client'

import { motion } from 'framer-motion'
import { Play, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface MockTestCardProps {
  id: string
  title: string
  description: string
  duration: number
  totalQuestions: number
  difficulty: 'easy' | 'medium' | 'hard'
  subject: string
  attempted: number
  bestScore: number | null
  icon: string
  index: number
  onStart: (id: string) => void
}

const difficultyColors = {
  easy: 'bg-emerald-500/20 text-emerald-300',
  medium: 'bg-amber-500/20 text-amber-300',
  hard: 'bg-red-500/20 text-red-300',
}

export function MockTestCard({
  id,
  title,
  description,
  duration,
  totalQuestions,
  difficulty,
  subject,
  attempted,
  bestScore,
  icon,
  index,
  onStart,
}: MockTestCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-slate-700 transition-all duration-300 group"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl">{icon}</div>
          <Badge className={difficultyColors[difficulty]}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
      </div>

      {/* Stats */}
      <div className="p-6 border-b border-slate-800 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">Duration</p>
            <p className="text-lg font-semibold text-white">{duration} min</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Questions</p>
            <p className="text-lg font-semibold text-white">{totalQuestions}</p>
          </div>
        </div>

        {bestScore !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3"
          >
            <p className="text-xs text-slate-400 mb-1">Best Score</p>
            <p className="text-lg font-semibold text-indigo-300">{bestScore}% ({attempted} attempts)</p>
          </motion.div>
        )}

        {attempted === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3"
          >
            <p className="text-xs text-blue-300">Not started yet</p>
          </motion.div>
        )}
      </div>

      {/* Button */}
      <div className="p-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onStart(id)}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40"
        >
          <Play size={20} />
          Start Test
        </motion.button>
      </div>
    </motion.div>
  )
}
