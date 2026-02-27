'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import {
  TrendingUp,
  Target,
  Zap,
  BookOpen,
  Activity,
} from 'lucide-react'
import { StatsCard } from '@/components/stats-card'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { recentActivity, weeklyProgressData, userData, mockTests } from '@/lib/dummy-data'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 md:p-8 space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Welcome back, {userData.name}!</h1>
          <p className="text-slate-400">
            You're rank #{userData.rank} with {userData.totalScore} points. Keep pushing! 🚀
          </p>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={itemVariants}>
          <StatsCard
            label="Total Tests"
            value={mockTests.filter(t => t.attempted > 0).length}
            icon={Zap}
            color="indigo"
            loading={loading}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            label="Average Score"
            value="84%"
            icon={Target}
            color="blue"
            loading={loading}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            label="Accuracy"
            value={`${userData.accuracy}%`}
            icon={TrendingUp}
            color="emerald"
            loading={loading}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            label="Questions Solved"
            value="847"
            icon={BookOpen}
            color="amber"
            loading={loading}
          />
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Weekly Progress */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-400" />
              Weekly Progress
            </h3>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ fill: '#6366f1', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card>
        </motion.div>

        {/* Stats Overview */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity size={20} className="text-blue-400" />
              Performance
            </h3>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-400">Current Streak</span>
                    <span className="text-sm font-semibold text-white">15 days</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-400">Accuracy Progress</span>
                    <span className="text-sm font-semibold text-white">78.5%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" style={{ width: '78.5%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-400">Test Completion</span>
                    <span className="text-sm font-semibold text-white">16/42</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full" style={{ width: '38%' }} />
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-slate-900 border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <div>
                        <p className="text-sm text-white">{activity.title}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                    {activity.score && (
                      <Badge className="bg-emerald-500/20 text-emerald-300">
                        {activity.score}%
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
