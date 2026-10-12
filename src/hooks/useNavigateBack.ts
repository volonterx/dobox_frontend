import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'

export function useNavigateBack(fallbackUrl: string) {
  const location = useLocation()
  const navigate = useNavigate()
  const locationKey = location.key

  return useCallback(() => {
    if (locationKey === 'default') navigate(fallbackUrl, { replace: true })
    else navigate(-1)
  }, [fallbackUrl, locationKey, navigate])
}
