import { getItemStatus } from '@/utils/itemStatus'
import type { Item } from '@/api.ts'
import TapeButton from '@/components/ui/TapeButton'

function FollowUpButton({ item, onClick }: { item: Item, onClick: () => void }){
  return (
    <TapeButton
      tone="primary" tape={6}
      className="btn-lg w-2/3"
      disabled={getItemStatus(item) !== 'finished'}
      onClick={onClick}
    >
      {'Create follow up'}
    </TapeButton>
  )
}

export default FollowUpButton