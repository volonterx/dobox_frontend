import { useState } from 'react'
import { updateItem, type Item } from '@/api'
import { getItemStatus } from '@/utils/itemStatus'

interface FinishButtonProps {
  item: Item
  onFinished: (item: Item) => void
}

function FinishButton({ item, onFinished }: FinishButtonProps) {
  const [pending, setPending] = useState(false)

  async function finish() {
    setPending(true)
    try {
      onFinished(await updateItem(item.id, { completed: new Date().toISOString() }))
    } finally {
      setPending(false)
    }
  }

  return (
    <button className="btn btn-success btn-lg flex-1" disabled={pending || getItemStatus(item) === 'finished'} onClick={finish}>
      {pending ? <span className="loading loading-spinner loading-xs" /> : 'Finish'}
    </button>
  )
}

export default FinishButton
