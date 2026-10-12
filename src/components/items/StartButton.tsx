import { useState } from 'react'
import { updateItem, type Item } from '@/api'
import { getItemStatus } from '@/utils/itemStatus'
import TapeButton from '@/components/ui/TapeButton'

interface StartButtonProps {
  item: Item
  onStarted: (item: Item) => void
}

function StartButton({ item, onStarted }: StartButtonProps) {
  const [pending, setPending] = useState(false)

  async function start() {
    setPending(true)
    try {
      onStarted(await updateItem(item.id, { started: true }))
    } finally {
      setPending(false)
    }
  }

  return (
    <TapeButton
      tone="primary" tape={4}
      className="btn-lg flex-1"
      disabled={pending || getItemStatus(item) !== 'new'}
      onClick={start}
    >
      {pending ? <span className="loading loading-spinner loading-xs" /> : 'Start'}
    </TapeButton>
  )
}

export default StartButton
