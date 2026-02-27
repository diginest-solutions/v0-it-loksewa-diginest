'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { leaderboardData } from '@/lib/dummy-data'
import { Skeleton } from '@/components/ui/skeleton'

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500/10 to-yellow-600/5 border-yellow-500/20'
      case 2:
        return 'from-slate-500/10 to-slate-600/5 border-slate-500/20'
      case 3:
        return 'from-orange-500/10 to-orange-600/5 border-orange-500/20'
      default:
        return 'from-slate-900 to-slate-950 border-slate-800'
    }
  }

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return null
    }
  }

  const currentUserIndex = leaderboardData.findIndex(u => u.isCurrentUser)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 md:p-8 space-y-6"
    >
      {/* Header */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Trophy className="text-yellow-400" size={32} />
            Global Leaderboard
          </h1>
          <p className="text-slate-400 mt-2">Compete with other aspirants and climb the ranks</p>
        </motion.div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {loading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="p-4 bg-slate-900 border-slate-800">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </>
        ) : (
          <>
            {/* Top 3 Podium */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              {leaderboardData.slice(0, 3).map((user, idx) => {
                const positions = [1, 0, 2] // Reorder to show 2nd in middle
                const position = positions[idx]

                return (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: position * 0.1 }}
                    className={`relative p-6 rounded-lg border bg-gradient-to-br ${getMedalColor(
                      user.rank
                    )} ${position === 1 ? 'md:scale-105 md:order-first' : ''}`}
                  >
                    {/* Medal */}
                    <div className="absolute -top-3 -right-3 text-4xl">
                      {getMedalIcon(user.rank)}
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-3">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-bold text-white">{user.name}</h3>
                      <p className="text-2xl font-bold text-indigo-300 mt-2">{user.score.toLocaleString()}</p>
                      <p className="text-sm text-slate-400">Points</p>
                      <Badge className="mt-3 bg-indigo-600 text-white">
                        {user.accuracy.toFixed(1)}% Accuracy
                      </Badge>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Rest of Leaderboard */}
            {leaderboardData.slice(3).map((user, idx) => (
              <motion.div
                key={user.rank}
                variants={itemVariants}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  user.isCurrentUser
                    ? 'bg-gradient-to-r from-indigo-600/20 to-blue-600/20 border-indigo-500/40'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Rank */}
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-400 w-8">#{user.rank}</p>
                    </div>

                    {/* User Info */}
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white">{user.name}</p>
                        {user.isCurrentUser && (
                          <Badge className="bg-indigo-600 text-white text-xs">You</Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-500">{user.accuracy.toFixed(1)}% accuracy</p>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <p className="text-xl font-bold text-indigo-300">
                      {user.score.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500">Points</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
