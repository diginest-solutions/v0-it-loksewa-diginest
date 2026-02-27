'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { QuestionCard } from '@/components/question-card'
import { questions } from '@/lib/dummy-data'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Empty } from '@/components/ui/empty'

type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard'
type SubjectFilter = 'all' | 'Data Structures' | 'Algorithms' | 'Database' | 'Web Development'

export default function QuestionBankPage() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('all')
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>('all')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty
    const matchesSubject = selectedSubject === 'all' || q.subject === selectedSubject

    return matchesSearch && matchesDifficulty && matchesSubject
  })

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
      className="p-6 md:p-8 space-y-6"
    >
      {/* Header */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold text-white">Question Bank</h1>
          <p className="text-slate-400 mt-2">
            Master concepts with our comprehensive question collection. Press <span className="font-mono bg-slate-800 px-2 py-1 rounded text-xs">Q</span> to jump here.
          </p>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* Search Bar */}
        <motion.div variants={itemVariants}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </motion.div>

        {/* Filter Tags */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-slate-400 flex items-center gap-2">
            <Filter size={16} />
            Difficulty:
          </span>
          {(['all', 'easy', 'medium', 'hard'] as const).map((difficulty) => (
            <motion.button
              key={difficulty}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedDifficulty === difficulty
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </motion.button>
          ))}

          <span className="text-sm text-slate-400 ml-4 flex items-center gap-2">
            Subject:
          </span>
          {(['all', 'Data Structures', 'Algorithms', 'Database', 'Web Development'] as const).map(
            (subject) => (
              <motion.button
                key={subject}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSubject(subject)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedSubject === subject
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {subject === 'all' ? 'All' : subject}
              </motion.button>
            )
          )}
        </motion.div>
      </motion.div>

      {/* Results Info */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-sm text-slate-400"
      >
        <motion.p variants={itemVariants}>
          Showing <span className="text-white font-semibold">{filteredQuestions.length}</span> question
          {filteredQuestions.length !== 1 ? 's' : ''}
        </motion.p>
      </motion.div>

      {/* Questions List */}
      {loading ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {[1, 2, 3].map((i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="bg-slate-900 border-slate-800">
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} className="h-12 w-full" />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : filteredQuestions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="py-12"
        >
          <Empty
            icon="🔍"
            title="No questions found"
            description="Try adjusting your filters or search terms"
          />
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredQuestions.map((question, index) => (
            <motion.div key={question.id} variants={itemVariants}>
              <QuestionCard question={question} index={index} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
