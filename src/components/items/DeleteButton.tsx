import { useState } from 'react'
import { useNavigate } from 'react-router'
import { deleteItem, type Item } from '@/api'
import TapeButton from '@/components/ui/TapeButton'

function DeleteButton({ item }: {item: Item}) {
  const navigate = useNavigate()
  const [pending, setPending] = useState(false)

  async function remove() {
    if (!confirm('Delete this item?')) return
    setPending(true)
    try {
      await deleteItem(item.id)
      navigate('/', { replace: true })
    } finally {
      setPending(false)
    }
  }

  return (
    <TapeButton tone="error" tape={1} className="btn-lg flex-1" disabled={pending} onClick={remove}>
      {pending ? <span className="loading loading-spinner loading-xs" /> : 'Delete'}
    </TapeButton>
  )
}

export default DeleteButton
