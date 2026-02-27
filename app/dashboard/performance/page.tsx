'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts'
import { Card } from '@/components/ui/card'
import { performanceData, weeklyProgressData } from '@/lib/dummy-data'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, Target, AlertCircle } from 'lucide-react'

export default function PerformancePage() {
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

  // Analysis data
  const strengthSubjects = performanceData
    .filter(d => d.accuracy > 0)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 3)

  const weaknessSubjects = performanceData
    .filter(d => d.accuracy > 0)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3)

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
          <h1 className="text-4xl font-bold text-white">Performance Analytics</h1>
          <p className="text-slate-400 mt-2">Track your progress and identify areas for improvement</p>
        </motion.div>
      </motion.div>

      {/* Charts */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Accuracy by Subject */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-slate-900 border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Target size={20} className="text-indigo-400" />
              Accuracy by Subject
            </h3>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={performanceData.filter(d => d.accuracy > 0)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis stroke="#64748b" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="accuracy" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </motion.div>

        {/* Weekly Trend */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-slate-900 border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-emerald-400" />
              Weekly Progress
            </h3>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
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
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card>
        </motion.div>
      </motion.div>

      {/* Strengths and Weaknesses */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Strengths */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
            <h3 className="text-lg font-semibold text-emerald-300 mb-4">Your Strengths 🌟</h3>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
              </div>
            ) : (
              <div className="space-y-3">
                {strengthSubjects.map((subject, idx) => (
                  <motion.div
                    key={subject.subject}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-3 bg-slate-900 rounded-lg border border-emerald-500/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{subject.subject}</span>
                      <span className="text-emerald-300 font-bold">{subject.accuracy}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full"
                        style={{ width: `${subject.accuracy}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Weaknesses */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
            <h3 className="text-lg font-semibold text-amber-300 mb-4 flex items-center gap-2">
              <AlertCircle size={20} />
              Areas to Improve
            </h3>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
              </div>
            ) : (
              <div className="space-y-3">
                {weaknessSubjects.map((subject, idx) => (
                  <motion.div
                    key={subject.subject}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-3 bg-slate-900 rounded-lg border border-amber-500/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{subject.subject}</span>
                      <span className="text-amber-300 font-bold">{subject.accuracy}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full"
                        style={{ width: `${subject.accuracy}%` }}
                      />
                    </div>
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
