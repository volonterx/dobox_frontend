import { formatDistance } from 'date-fns'
import type { Item } from '@/api'
import { getItemStatus } from '@/utils/itemStatus'

function Elapsed({ item }: { item: Item }) {
  if (getItemStatus(item) !== 'finished' || !item.started_at || !item.completed_at)
    return null

  const duration = formatDistance(new Date(item.started_at), new Date(item.completed_at))

  return <p className="text-sm opacity-60">Took {duration}</p>
}

export default Elapsed
