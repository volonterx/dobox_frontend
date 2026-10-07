import { useBackTo } from '@/hooks/useBackTo'
import {getItem, type Item} from "@/api.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import { formatDistanceToNow } from 'date-fns'
import { getItemStatus } from '@/utils/itemStatus'
import StartButton from '@/components/items/StartButton'
import FinishButton from '@/components/items/FinishButton'
import DeleteButton from '@/components/items/DeleteButton'
import Timer from '@/components/items/Timer'
import Elapsed from '@/components/items/Elapsed'
import StatusBadge from '@/components/items/StatusBadge'

function ItemPage() {
  useBackTo('/')

  const { id } = useParams()
  const [item, setItem] = useState<Item>()

  useEffect(() => {
    getItem(Number(id)).then(setItem)
  }, [id])

  if (!item) return <span className="loading loading-spinner mx-auto mt-16 block" />

  const status = getItemStatus(item)

  return (
    <div className="flex flex-col items-center gap-3 pt-8 pb-36 text-center">
      <StatusBadge status={status} />
      <h2 className={`text-2xl font-semibold break-words ${status === 'finished' ? 'line-through opacity-60' : ''}`}>
        {item.title}
      </h2>

      {status === 'ongoing' && (
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold"><Timer item={item}/></span>
        </div>
      )}
      <Elapsed item={item} />
      {status === 'finished' && item.completed_at && (
        <p className="text-sm opacity-60">
          Finished {formatDistanceToNow(new Date(item.completed_at), { addSuffix: true })}
        </p>
      )}

      <div className="fixed inset-x-0 bottom-0 bg-base-100 pt-2 pb-18">
        <div className="mx-auto flex max-w-lg gap-2 px-4">
          <DeleteButton item={item} />
          <StartButton item={item} onStarted={setItem} />
          <FinishButton item={item} onFinished={setItem} />
        </div>
      </div>
    </div>
  )

}

export default ItemPage
