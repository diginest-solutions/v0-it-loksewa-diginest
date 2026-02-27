'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Zap, Users, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
            IT Prep
          </h1>
          <Link href="/dashboard">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Get Started
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-6xl mx-auto px-6 py-20 md:py-32"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-block mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10"
            >
              <Sparkles size={16} className="text-indigo-400" />
              <span className="text-sm text-indigo-300">Nepal's #1 IT Loksewa Prep Platform</span>
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance">
            Master IT Loksewa Exams with
            <span className="block bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Smart Preparation
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto text-balance">
            Comprehensive question bank, realistic mock tests, and expert-curated resources to ace your Public Service Commission IT Officer exam.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/dashboard">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg h-auto rounded-lg shadow-lg shadow-indigo-500/20">
                Start Free Trial
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-slate-700 hover:bg-slate-800 px-8 py-6 text-lg h-auto rounded-lg"
            >
              View Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 md:gap-8 py-12 border-t border-b border-slate-800"
        >
          {[
            { number: '10K+', label: 'Questions' },
            { number: '500+', label: 'Tests' },
            { number: '5000+', label: 'Users' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-indigo-300 mb-2">
                {stat.number}
              </p>
              <p className="text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-16">
          Why Choose IT Prep?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: BookOpen,
              title: 'Comprehensive Question Bank',
              description: 'Over 10,000 carefully curated questions covering all IT Loksewa exam topics.',
              color: 'indigo',
            },
            {
              icon: Zap,
              title: 'Realistic Mock Tests',
              description: 'Practice with exam-like tests that accurately simulate the real exam experience.',
              color: 'blue',
            },
            {
              icon: TrendingUp,
              title: 'Performance Analytics',
              description: 'Track your progress with detailed analytics and identify areas for improvement.',
              color: 'emerald',
            },
            {
              icon: Users,
              title: 'Global Leaderboard',
              description: 'Compete with fellow aspirants and stay motivated on your preparation journey.',
              color: 'amber',
            },
          ].map((feature, idx) => {
            const Icon = feature.icon
            const colorMap = {
              indigo: 'bg-indigo-500/20 text-indigo-300',
              blue: 'bg-blue-500/20 text-blue-300',
              emerald: 'bg-emerald-500/20 text-emerald-300',
              amber: 'bg-amber-500/20 text-amber-300',
            }

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="p-6 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all duration-300"
              >
                <div className={`inline-block p-3 rounded-lg mb-4 ${colorMap[feature.color as keyof typeof colorMap]}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-16">
          How It Works
        </motion.h2>

        <div className="space-y-8">
          {[
            {
              step: '01',
              title: 'Start Learning',
              description: 'Access our comprehensive question bank and start solving questions immediately.',
            },
            {
              step: '02',
              title: 'Practice with Tests',
              description: 'Take mock tests to evaluate your preparation and identify weak areas.',
            },
            {
              step: '03',
              title: 'Track Progress',
              description: 'Monitor your performance with detailed analytics and progress charts.',
            },
            {
              step: '04',
              title: 'Ace Your Exam',
              description: 'Feel confident and ready to ace your IT Loksewa exam on exam day.',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600">
                  <span className="text-lg font-bold text-white">{item.step}</span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 py-20 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="p-12 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-blue-500/10"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Join thousands of successful IT Loksewa aspirants. Start your free preparation today.
          </p>
          <Link href="/dashboard">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg h-auto rounded-lg shadow-lg shadow-indigo-500/20">
              Start Your Preparation
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-slate-800 mt-20 py-12"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent mb-4">
                IT Prep
              </h3>
              <p className="text-slate-500 text-sm">
                Your ultimate platform for IT Loksewa exam preparation.
              </p>
            </div>

            {[
              { title: 'Platform', links: ['Dashboard', 'Question Bank', 'Mock Tests'] },
              { title: 'Resources', links: ['Study Notes', 'Performance', 'Leaderboard'] },
              { title: 'Company', links: ['About', 'Contact', 'Privacy'] },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-500 text-center text-sm">
              © 2024 IT Loksewa Smart Prep. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
