import { useEffect, useState, type ReactNode } from 'react'
import { fetchMe, logOut, type User } from '@/api'
import { AuthContext } from './useAuth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMe().then(setUser).finally(() => setLoading(false))
  }, [])

  async function logout() {
    await logOut()
    setUser(null)
  }

  return <AuthContext value={{ user, loading, logout }}>{children}</AuthContext>
}
