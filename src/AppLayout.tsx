import { useState } from 'react'
import Header from '@/components/layout/Header'
import { BackContext, type Back } from '@/hooks/useBackTo'
import { Outlet } from 'react-router'

function AppLayout() {
    const [back, setBack] = useState<Back | null>(null)
  return (
    <BackContext value={{ back, setBack }}>
      <Header />
      <div className="scroll-under-header h-dvh overflow-y-auto">
        <div className="mx-auto max-w-lg px-4 pb-4">
          <Outlet />
        </div>
      </div>
    </BackContext>
  )
}

export default AppLayout
