import { createContext, useContext, useEffect } from 'react'

export interface Back {
  to: string
  onBack?: () => void
}

interface BackContextValue {
  back: Back | null
  setBack: (back: Back | null) => void
}

export const BackContext = createContext<BackContextValue | null>(null)

function useBackContext() {
  const ctx = useContext(BackContext)
  if (!ctx) throw new Error('Back context must be used inside <AppLayout>')
  return ctx
}

export function useBack() {          // was useBackTarget
  return useBackContext().back
}

export function useBackTo(to: string, onBack?: () => void) {
  const { setBack } = useBackContext()

  useEffect(() => {
    setBack({ to, onBack })
    return () => setBack(null)
  }, [to, onBack, setBack])
}


