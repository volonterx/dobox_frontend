import type { Item } from '@/api'

export type ItemStatus = 'new' | 'ongoing' | 'finished'

export function getItemStatus(item: Pick<Item, 'started_at' | 'completed_at'>): ItemStatus {
  if (item.completed_at) return 'finished'
  if (item.started_at) return 'ongoing'
  return 'new'
}
