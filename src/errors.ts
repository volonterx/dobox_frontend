import { useSyncExternalStore } from 'react'
import { ApiError } from '@/api'

let current: { text: string } | null = null
const listeners = new Set<() => void>()

function set(next: typeof current) {
  current = next
  listeners.forEach(l => l())
}

export const showError = (e: unknown) =>
  set({ text: e instanceof ApiError ? e.message : 'Something went wrong' })

export const clearError = () => set(null)

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => { listeners.delete(l) }
}

export const useError = () => useSyncExternalStore(subscribe, () => current)
