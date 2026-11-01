import type { Item } from '@/api'
import TapeButton from '@/components/ui/TapeButton'
import { useDeleteItem } from '@/hooks/useDeleteItem'

function DeleteButton({ item }: {item: Item}) {
  const { remove, pending } = useDeleteItem(item)

  return (
    <TapeButton tone="error" tape={1} className="btn-lg flex-1" disabled={pending} onClick={remove}>
      {pending ? <span className="loading loading-spinner loading-xs" /> : 'Delete'}
    </TapeButton>
  )
}

export default DeleteButton
