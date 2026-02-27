'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, BookMarked, Search } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Empty } from '@/components/ui/empty'

const notesData = [
  {
    id: '1',
    subject: 'Data Structures',
    title: 'Arrays & Linked Lists Fundamentals',
    size: '2.4 MB',
    downloadCount: 1240,
  },
  {
    id: '2',
    subject: 'Data Structures',
    title: 'Trees & Graph Concepts',
    size: '3.1 MB',
    downloadCount: 980,
  },
  {
    id: '3',
    subject: 'Algorithms',
    title: 'Sorting & Searching Algorithms',
    size: '2.8 MB',
    downloadCount: 756,
  },
  {
    id: '4',
    subject: 'Algorithms',
    title: 'Dynamic Programming Patterns',
    size: '3.5 MB',
    downloadCount: 543,
  },
  {
    id: '5',
    subject: 'Database',
    title: 'SQL Query Optimization',
    size: '1.9 MB',
    downloadCount: 892,
  },
  {
    id: '6',
    subject: 'Database',
    title: 'Database Design & Normalization',
    size: '2.2 MB',
    downloadCount: 654,
  },
  {
    id: '7',
    subject: 'Web Development',
    title: 'Frontend Development Best Practices',
    size: '2.6 MB',
    downloadCount: 1100,
  },
  {
    id: '8',
    subject: 'Web Development',
    title: 'Backend Architecture Patterns',
    size: '3.0 MB',
    downloadCount: 821,
  },
]

export default function NotesPage() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const filteredNotes = notesData.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const groupedBySubject = filteredNotes.reduce((acc, note) => {
    if (!acc[note.subject]) {
      acc[note.subject] = []
    }
    acc[note.subject].push(note)
    return acc
  }, {} as Record<string, typeof notesData>)

  const subjectColors: Record<string, string> = {
    'Data Structures': 'from-indigo-500/10 to-indigo-600/5 border-indigo-500/20',
    'Algorithms': 'from-blue-500/10 to-blue-600/5 border-blue-500/20',
    'Database': 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20',
    'Web Development': 'from-purple-500/10 to-purple-600/5 border-purple-500/20',
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
            <BookMarked className="text-indigo-400" size={32} />
            Study Notes
          </h1>
          <p className="text-slate-400 mt-2">Download comprehensive notes curated by experts</p>
        </motion.div>
      </motion.div>

      {/* Search */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="text"
              placeholder="Search notes by title or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Notes by Subject */}
      {loading ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div key={i} variants={itemVariants} className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-2">
                {[1, 2].map((j) => (
                  <Skeleton key={j} className="h-20 w-full" />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : Object.keys(groupedBySubject).length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="py-12"
        >
          <Empty
            icon="📚"
            title="No notes found"
            description="Try adjusting your search terms"
          />
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {Object.entries(groupedBySubject).map(([subject, notes], sectionIdx) => (
            <motion.div
              key={subject}
              variants={itemVariants}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-white">{subject}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.map((note, idx) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionIdx * 0.1 + idx * 0.05 }}
                  >
                    <Card className={`p-6 bg-gradient-to-br ${subjectColors[subject]} hover:border-opacity-100 transition-all duration-300 h-full flex flex-col`}>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{note.title}</h3>
                        <div className="space-y-2 text-sm text-slate-400">
                          <p>📦 Size: <span className="text-white font-medium">{note.size}</span></p>
                          <p>⬇️ Downloads: <span className="text-white font-medium">{note.downloadCount.toLocaleString()}</span></p>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                      >
                        <Download size={18} />
                        Download PDF
                      </motion.button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
