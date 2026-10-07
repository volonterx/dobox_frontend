import type { ItemStatus } from '@/utils/itemStatus'

const BADGES: Record<ItemStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'badge-ghost' },
  ongoing: { label: 'In progress', className: 'badge-primary' },
  finished: { label: 'Done', className: 'badge-success' },
}

function StatusBadge({ status }: { status: ItemStatus }) {
  const { label, className } = BADGES[status]
  return <span className={`badge ${className}`}>{label}</span>
}

export default StatusBadge
