import { useState } from 'react'
import Header from '@/components/layout/Header'
import { BackContext } from '@/hooks/useBackTo'
import { Outlet } from 'react-router'

function AppLayout() {
  const [backTo, setBackTo] = useState<string | null>(null)
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
