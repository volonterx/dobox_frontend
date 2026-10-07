import { useState } from 'react'
import { useNavigate } from 'react-router'
import { deleteItem, type Item } from '@/api'

interface DeleteButtonProps {
  item: Item
}

function DeleteButton({ item }: DeleteButtonProps) {
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
    <button className="btn btn-error btn-outline btn-lg flex-1" disabled={pending} onClick={remove}>
      {pending ? <span className="loading loading-spinner loading-xs" /> : 'Delete'}
    </button>
  )
}

export default DeleteButton
