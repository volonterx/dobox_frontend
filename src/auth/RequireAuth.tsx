import { Outlet, Navigate } from 'react-router'
import { useAuth } from './useAuth'

function RequireAuth() {
  const { user, loading } = useAuth()
  if (loading) return <span className="loading loading-spinner mx-auto mt-16 block" />
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}

export default RequireAuth