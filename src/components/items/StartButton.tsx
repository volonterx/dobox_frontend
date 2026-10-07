import { useState } from 'react'
import { updateItem, type Item } from '@/api'
import { getItemStatus } from '@/utils/itemStatus'

interface StartButtonProps {
  item: Item
  onStarted: (item: Item) => void
}

function StartButton({ item, onStarted }: StartButtonProps) {
  const [pending, setPending] = useState(false)

  async function start() {
    setPending(true)
    try {
      onStarted(await updateItem(item.id, { started_at: new Date().toISOString() }))
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      className="btn btn-primary btn-lg flex-1"
      disabled={pending || getItemStatus(item) !== 'new'}
      onClick={start}
    >
      {pending ? <span className="loading loading-spinner loading-xs" /> : 'Start'}
    </button>
  )
}

export default StartButton
