import { createContext, useContext, useEffect } from 'react'

interface BackContextValue {
  backTo: string | null
  setBackTo: (to: string | null) => void
}

export const BackContext = createContext<BackContextValue | null>(null)

function useBackContext() {
  const ctx = useContext(BackContext)
  if (!ctx) throw new Error('Back context must be used inside <AppLayout>')
  return ctx
}

export function useBackTarget() {
  return useBackContext().backTo
}

export function useBackTo(to: string) {
  const { setBackTo } = useBackContext()

  useEffect(() => {
    setBackTo(to)
    return () => setBackTo(null)
  }, [to, setBackTo])
}
