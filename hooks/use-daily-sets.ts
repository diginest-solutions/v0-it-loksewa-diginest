import { useState, useEffect } from 'react'
import { generateDailyQuestionSets, type DailyQuestionSet } from '@/lib/dummy-data'

export function useDailySets() {
  const [sets, setSets] = useState<DailyQuestionSet[]>([])
  const [loading, setLoading] = useState(true)
  const [completedSetIds, setCompletedSetIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const timer = setTimeout(() => {
      setSets(generateDailyQuestionSets())
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const markSetComplete = (setId: string, score: number) => {
    setCompletedSetIds((prev) => new Set([...prev, setId]))
    setSets((prevSets) =>
      prevSets.map((set) =>
        set.id === setId ? { ...set, completed: true, score } : set
      )
    )
  }

  const isTodayComplete = completedSetIds.size === sets.length && sets.length > 0

  return {
    sets,
    loading,
    completedSetIds,
    markSetComplete,
    isTodayComplete,
  }
}
