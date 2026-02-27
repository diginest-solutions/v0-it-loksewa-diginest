'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { mockTests } from '@/lib/dummy-data'
import { MockTestCard } from '@/components/mock-test-card'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { Zap } from 'lucide-react'

export default function MockTestsPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleStartTest = (testId: string) => {
    toast.success('Test started!', {
      description: 'Good luck! Remember to manage your time wisely.',
    })
  }

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

  // Stats
  const totalTests = mockTests.length
  const attemptedTests = mockTests.filter(t => t.attempted > 0).length
  const avgScore = mockTests.length > 0
    ? Math.round(mockTests.reduce((sum, t) => sum + (t.bestScore || 0), 0) / attemptedTests)
    : 0

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
          <h1 className="text-4xl font-bold text-white">Mock Tests</h1>
          <p className="text-slate-400 mt-2">
            Practice with realistic exam-like tests. Press <span className="font-mono bg-slate-800 px-2 py-1 rounded text-xs">M</span> to jump here.
          </p>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      {!loading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <motion.div variants={itemVariants}>
            <Card className="p-4 bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
              <p className="text-sm text-slate-400 mb-2">Total Tests</p>
              <p className="text-3xl font-bold text-white">{totalTests}</p>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
              <p className="text-sm text-slate-400 mb-2">Completed</p>
              <p className="text-3xl font-bold text-white">{attemptedTests}</p>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40 transition-colors">
              <p className="text-sm text-slate-400 mb-2">Avg Score</p>
              <p className="text-3xl font-bold text-white">{avgScore}%</p>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Tests Grid */}
      {loading ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="bg-slate-900 border-slate-800 h-96">
                <div className="p-6 space-y-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-12 w-full mt-auto" />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockTests.map((test, index) => (
            <motion.div key={test.id} variants={itemVariants}>
              <MockTestCard
                {...test}
                index={index}
                onStart={handleStartTest}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
