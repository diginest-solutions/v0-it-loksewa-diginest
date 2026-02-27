'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Trophy, TrendingUp, BookOpen, Zap, LogOut } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { userData } from '@/lib/dummy-data'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleLogout = () => {
    toast.success('Logging out...', {
      description: 'See you next time!',
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
            <User className="text-indigo-400" size={32} />
            Profile Settings
          </h1>
        </motion.div>
      </motion.div>

      {loading ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {[1, 2, 3].map(i => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="p-6 bg-slate-900 border-slate-800">
                <Skeleton className="h-32 w-full" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Profile Card */}
          <motion.div variants={itemVariants}>
            <Card className="p-8 bg-gradient-to-br from-indigo-500/10 to-blue-600/5 border-indigo-500/20">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-1">{userData.name}</h2>
                  <p className="text-slate-400 flex items-center justify-center md:justify-start gap-2 mb-4">
                    <Mail size={16} />
                    {userData.email}
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                    <Badge className="bg-indigo-600 text-white">
                      <Trophy className="mr-1" size={14} />
                      Rank #{userData.rank}
                    </Badge>
                    <Badge className="bg-emerald-600 text-white">
                      <TrendingUp className="mr-1" size={14} />
                      {userData.accuracy}% Accuracy
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Card className="p-6 bg-slate-900 border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Zap className="text-indigo-400" size={20} />
                </div>
                <p className="text-sm text-slate-400">Total Score</p>
              </div>
              <p className="text-3xl font-bold text-white">{userData.totalScore}</p>
            </Card>

            <Card className="p-6 bg-slate-900 border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <TrendingUp className="text-emerald-400" size={20} />
                </div>
                <p className="text-sm text-slate-400">Accuracy</p>
              </div>
              <p className="text-3xl font-bold text-white">{userData.accuracy}%</p>
            </Card>

            <Card className="p-6 bg-slate-900 border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BookOpen className="text-blue-400" size={20} />
                </div>
                <p className="text-sm text-slate-400">Questions Solved</p>
              </div>
              <p className="text-3xl font-bold text-white">847</p>
            </Card>
          </motion.div>

          {/* Account Settings */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-slate-900 border-slate-800">
              <h3 className="text-lg font-semibold text-white mb-6">Account Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={userData.name}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={userData.email}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white disabled:opacity-60"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => setIsEditing(false)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        Save Changes
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-slate-700"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Learning Preferences */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-slate-900 border-slate-800">
              <h3 className="text-lg font-semibold text-white mb-6">Learning Preferences</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <label className="text-white font-medium">Email Notifications</label>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <label className="text-white font-medium">Weekly Progress Reports</label>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <label className="text-white font-medium">Receive New Questions</label>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Logout */}
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 hover:border-red-500/60 text-red-300 hover:text-red-200 font-semibold py-3 rounded-lg transition-all duration-300"
            >
              <LogOut size={20} />
              Logout
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
