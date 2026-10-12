import type { ItemStatus } from '@/utils/itemStatus'
import { useTape } from '@/components/ui/useTape'

const BADGES: Record<ItemStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'tape-neutral' },
  ongoing: { label: 'In progress', className: 'tape-primary' },
  finished: { label: 'Done', className: 'tape-success' },
}

function StatusBadge({ status }: { status: ItemStatus }) {
  const { label, className } = BADGES[status]
  const ref = useTape<HTMLSpanElement>()
  return <span ref={ref} className={`badge tape tape-sm ${className}`}>{label}</span>
}

export default StatusBadge
