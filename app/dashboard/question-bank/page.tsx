'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Check, Zap, X } from 'lucide-react'
import { QuestionCard } from '@/components/question-card'
import { questions, generateDailyQuestionSets, type DailyQuestionSet } from '@/lib/dummy-data'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Empty } from '@/components/ui/empty'

type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard'
type SubjectFilter = 'all' | 'Data Structures' | 'Algorithms' | 'Database' | 'Web Development'
type ViewMode = 'daily' | 'bank'

export default function QuestionBankPage() {
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('daily')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('all')
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>('all')
  const [dailySets, setDailySets] = useState<DailyQuestionSet[]>([])
  const [expandedSet, setExpandedSet] = useState<string | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const timer = setTimeout(() => {
      const sets = generateDailyQuestionSets()
      setDailySets(sets)
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const toggleExplanation = (questionId: string) => {
    setShowExplanations((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }))
  }

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

      {/* View Mode Toggle */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex gap-2"
      >
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setViewMode('daily')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            viewMode === 'daily'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Zap size={18} />
          Daily Sets
        </motion.button>
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setViewMode('bank')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            viewMode === 'bank'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Search size={18} />
          Question Bank
        </motion.button>
      </motion.div>

      {/* Daily Sets View */}
      {viewMode === 'daily' && (
        <>
          {loading ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-4"
            >
              {[1, 2, 3].map((i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="bg-slate-900 border-slate-800">
                    <div className="p-6 space-y-4">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-4 w-1/2" />
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
              className="grid grid-cols-1 gap-4"
            >
              {dailySets.map((set) => (
                <motion.div key={set.id} variants={itemVariants}>
                  <Card
                    onClick={() =>
                      setExpandedSet(expandedSet === set.id ? null : set.id)
                    }
                    className="bg-slate-900 border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all duration-200"
                  >
                    <div className="p-6 space-y-4">
                      {/* Set Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-600/20 text-amber-400 px-3 py-1 rounded-lg text-sm font-semibold">
                            Daily Set {set.setNumber}
                          </div>
                          <p className="text-slate-400 text-sm">{set.dateString}</p>
                        </div>
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{
                            rotate: expandedSet === set.id ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg
                            className="w-5 h-5 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                        </motion.div>
                      </div>

                      {/* Set Info */}
                      <div className="grid grid-cols-3 gap-4 py-4 border-t border-slate-800">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Questions</p>
                          <p className="text-lg font-semibold text-white">
                            {set.totalQuestions}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Difficulty</p>
                          <div className="flex gap-1">
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                              Easy
                            </span>
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                              Med
                            </span>
                            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                              Hard
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Status</p>
                          <p className="text-sm font-medium text-slate-300">
                            {set.completed ? (
                              <span className="flex items-center gap-1 text-green-400">
                                <Check size={16} />
                                Completed
                              </span>
                            ) : (
                              <span className="text-slate-400">Not started</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {expandedSet === set.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-3 pt-4 border-t border-slate-800"
                        >
                          {set.questions.map((question, idx) => {
                            const selected = selectedAnswers[question.id]
                            const isAnswered = selected !== undefined
                            const isCorrect = isAnswered && question.options?.find((o) => o.id === selected)?.isCorrect
                            const showExp = showExplanations[question.id]

                            return (
                              <motion.div
                                key={question.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-4 rounded-lg bg-slate-800/50 space-y-4 border border-slate-700/50"
                              >
                                {/* Question Header */}
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-white">
                                      Q{idx + 1}. {question.text}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">{question.subject}</p>
                                  </div>
                                  <span
                                    className={`text-xs px-2 py-1 rounded whitespace-nowrap font-medium ${
                                      question.difficulty === 'easy'
                                        ? 'bg-green-500/20 text-green-400'
                                        : question.difficulty === 'medium'
                                          ? 'bg-yellow-500/20 text-yellow-400'
                                          : 'bg-red-500/20 text-red-400'
                                    }`}
                                  >
                                    {question.difficulty}
                                  </span>
                                </div>

                                {/* MCQ Options - Interactive */}
                                {question.options && question.options.length > 0 && (
                                  <div className="space-y-2 pt-2">
                                    {question.options.map((option) => {
                                      const isSelected = selected === option.id
                                      const shouldHighlight = isAnswered && (isSelected || (option.isCorrect && showExp))

                                      return (
                                        <motion.button
                                          key={option.id}
                                          onClick={() => !isAnswered && handleSelectAnswer(question.id, option.id)}
                                          whileHover={!isAnswered ? { scale: 1.01 } : {}}
                                          disabled={isAnswered}
                                          className={`w-full text-left p-3 rounded-lg text-sm font-medium transition-all border-2 ${
                                            !isAnswered
                                              ? 'cursor-pointer border-slate-600/30 bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500/50'
                                              : shouldHighlight
                                                ? isSelected && !option.isCorrect
                                                  ? 'border-red-500/50 bg-red-500/20 text-red-200'
                                                  : 'border-green-500/50 bg-green-500/20 text-green-200'
                                                : 'border-slate-600/20 bg-slate-800/30 text-slate-400 opacity-50'
                                          }`}
                                        >
                                          <span className="flex items-center justify-between gap-2">
                                            <span>
                                              <span className="font-semibold">{option.id.toUpperCase()}.</span> {option.text}
                                            </span>
                                            {isAnswered && shouldHighlight && (
                                              <span className={`text-lg ${option.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                                {option.isCorrect ? '✓' : '✗'}
                                              </span>
                                            )}
                                          </span>
                                        </motion.button>
                                      )
                                    })}
                                  </div>
                                )}

                                {/* Answer Feedback */}
                                {isAnswered && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                                      isCorrect
                                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                    }`}
                                  >
                                    {isCorrect ? (
                                      <>
                                        <Check size={18} />
                                        Correct Answer!
                                      </>
                                    ) : (
                                      <>
                                        <X size={18} />
                                        Incorrect. The correct answer is highlighted above.
                                      </>
                                    )}
                                  </motion.div>
                                )}

                                {/* Explanation */}
                                {isAnswered && question.explanation && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="pt-3 border-t border-slate-700/50 space-y-2"
                                  >
                                    <motion.button
                                      onClick={() => toggleExplanation(question.id)}
                                      className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2"
                                    >
                                      <motion.div
                                        animate={{ rotate: showExp ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                      </motion.div>
                                      View Explanation
                                    </motion.button>

                                    {showExp && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded border border-indigo-500/20"
                                      >
                                        {question.explanation}
                                      </motion.div>
                                    )}
                                  </motion.div>
                                )}
                              </motion.div>
                            )
                          })}

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full mt-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
                          >
                            Start Practicing
                          </motion.button>
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      )}

      {/* Question Bank View */}
      {viewMode === 'bank' && (
        <>
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
              Showing <span className="text-white font-semibold">{filteredQuestions.length}</span>{' '}
              question{filteredQuestions.length !== 1 ? 's' : ''}
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
        </>
      )}
    </motion.div>
  )
}
