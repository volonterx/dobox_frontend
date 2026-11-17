import { useEffect, useState } from 'react'
import { clearError, useError } from '@/errors'

function ErrorBanner() {
  const error = useError()
  const [closing, setClosing] = useState<typeof error>(null)
  const leaving = error !== null && closing === error

  useEffect(() => {
    if (!error) return
    const timer = setTimeout(() => setClosing(error), 5000)
    return () => clearTimeout(timer)
  }, [error])

  if (!error) return null

  return (
    <div
      role="alert"
      className={`fixed inset-x-0 top-0 z-30 mx-auto max-w-lg motion-reduce:[animation-duration:1ms] ${leaving ? 'animate-slide-up' : 'animate-slide-down'}`}
      onAnimationEnd={() => leaving && clearError()}
    >
      <button className="block w-full cursor-pointer text-left text-white drop-shadow-md" onClick={() => setClosing(error)} title="Dismiss">
        <span className="block bg-[#de7686] px-6 pt-4 pb-2">{error.text}</span>
        <img src="/torn-edge.svg" alt="" className="block h-6 w-full" />
      </button>
    </div>
  )
}

export default ErrorBanner
