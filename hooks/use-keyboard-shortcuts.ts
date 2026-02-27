import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useKeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only trigger if no modifier keys are pressed and not in input field
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      switch (event.key.toLowerCase()) {
        case 'q':
          event.preventDefault()
          router.push('/dashboard/question-bank')
          toast.success('Navigating to Question Bank', {
            description: 'Press Q anytime to jump here',
          })
          break
        case 'm':
          event.preventDefault()
          router.push('/dashboard/mock-tests')
          toast.success('Navigating to Mock Tests', {
            description: 'Press M anytime to jump here',
          })
          break
        case 'd':
          event.preventDefault()
          router.push('/dashboard')
          toast.success('Navigating to Dashboard', {
            description: 'Press D anytime to jump here',
          })
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router])
}
