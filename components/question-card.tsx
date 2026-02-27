'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Bookmark, Code } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Question {
  id: string
  subject: string
  difficulty: string
  category: string
  text: string
  options: Array<{
    id: string
    text: string
    isCorrect: boolean
  }>
  explanation: string
  codeSnippet?: string
}

interface QuestionCardProps {
  question: Question
  index: number
}

const difficultyColors = {
  easy: 'bg-emerald-500/20 text-emerald-300',
  medium: 'bg-amber-500/20 text-amber-300',
  hard: 'bg-red-500/20 text-red-300',
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-slate-700 transition-all duration-300"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-slate-500">Q{index + 1}</span>
              <Badge className={difficultyColors[question.difficulty as keyof typeof difficultyColors]}>
                {question.difficulty}
              </Badge>
              <Badge variant="outline" className="border-slate-700">
                {question.category}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-white">{question.text}</h3>
          </div>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="ml-4 p-2 text-slate-400 hover:text-amber-400 transition-colors"
          >
            <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="p-6 space-y-3">
        {question.options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => setSelectedAnswer(option.id)}
            whileHover={{ x: 4 }}
            className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
              selectedAnswer === option.id
                ? option.isCorrect
                  ? 'bg-emerald-500/20 border border-emerald-500'
                  : 'bg-red-500/20 border border-red-500'
                : 'bg-slate-800 border border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center text-sm font-semibold ${
                  selectedAnswer === option.id
                    ? option.isCorrect
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-red-500 bg-red-500 text-white'
                    : 'border-slate-600 text-slate-400'
                }`}
              >
                {selectedAnswer === option.id ? (option.isCorrect ? '✓' : '✗') : option.id.toUpperCase()}
              </div>
              <span className="text-slate-100">{option.text}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Expandable Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-800 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {question.codeSnippet && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Code size={18} className="text-blue-400" />
                    <h4 className="font-semibold text-white">Code Example</h4>
                  </div>
                  <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto text-sm text-slate-100 border border-slate-700">
                    <code>{question.codeSnippet}</code>
                  </pre>
                </div>
              )}
              <div>
                <h4 className="font-semibold text-white mb-2">Explanation</h4>
                <p className="text-slate-300 leading-relaxed">{question.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 border-t border-slate-800 flex items-center justify-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} />
        </motion.div>
        {isExpanded ? 'Hide' : 'Show'} Explanation
      </motion.button>
    </motion.div>
  )
}
