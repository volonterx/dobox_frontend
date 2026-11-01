import { useState } from 'react'
import { updateItem, type Item } from '@/api'
import TapeButton from '@/components/ui/TapeButton'

interface ResetButtonProps {
  item: Item
  onReset: (item: Item) => void
}

function ResetButton({ item, onReset }: ResetButtonProps) {
  const [pending, setPending] = useState(false)

  async function reset() {
    if (!confirm('Do you want to reset this task?')) return
    setPending(true)
    try {
      onReset(await updateItem(item.id, { started_at: null, completed_at: null }))
    } finally {
      setPending(false)
    }
  }

  return (
    <TapeButton tone="neutral" tape={5} className="btn-lg flex-1" disabled={pending} onClick={reset}>
      {pending ? <span className="loading loading-spinner loading-xs" /> : 'Reset'}
    </TapeButton>
  )
}

export default ResetButton
