import { useState } from 'react'
import { useNavigate } from 'react-router'
import { deleteItem, type Item } from '@/api'

export function useDeleteItem(item: Item) {
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

  return { remove, pending }
}
