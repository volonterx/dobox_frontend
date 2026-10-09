import { getItemStatus } from '@/utils/itemStatus'
import type { Item } from '@/api.ts'

function FollowUpButton({ item, onClick }: { item: Item, onClick: () => void }){
  return (
    <button
      className="btn btn-primary btn-lg w-2/3"
      disabled={getItemStatus(item) !== 'finished'}
      onClick={onClick}
    >
      {'Create follow up'}
    </button>
  )
}

export default FollowUpButton