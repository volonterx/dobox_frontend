import { AuthProvider } from '@/auth/AuthProvider'
import AppRoutes from '@/AppRoutes'


function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
