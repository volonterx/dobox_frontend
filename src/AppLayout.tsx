import { useState } from 'react'
import Header from '@/components/layout/Header'
import { useAuth } from '@/auth/useAuth'
import { BackContext } from '@/hooks/useBackTo'
import {Navigate, Outlet} from 'react-router'

function AppLayout() {
  const { user, loading } = useAuth()
  const [backTo, setBackTo] = useState<string | null>(null)
  if (loading) return <span className="loading loading-spinner mx-auto mt-16 block" />
  if (!user) return <Navigate to="/login" replace />
  return (
    <BackContext value={{ backTo, setBackTo }}>
      <div className="mx-auto max-w-lg p-4">
        <Header />
        <Outlet />
      </div>
    </BackContext>
  )
}

export default AppLayout
