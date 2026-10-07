import { useBackTo } from '@/hooks/useBackTo'
import {getItem, type Item} from "@/api.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import { formatDistanceToNow } from 'date-fns'
import { getItemStatus } from '@/utils/itemStatus'
import StartButton from '@/components/items/StartButton'
import FinishButton from '@/components/items/FinishButton'
import DeleteButton from '@/components/items/DeleteButton'

function ItemPage() {
  useBackTo('/')

  const { id } = useParams()
  const [item, setItem] = useState<Item>()

  const status = item && getItemStatus(item)

  function finishedAgo() {
    if (status !== 'finished' || !item?.completed_at) return null
    return (
      <p className="text-sm opacity-60">
        Finished {formatDistanceToNow(new Date(item.completed_at), { addSuffix: true })}
      </p>
    )
  }

  useEffect(() => {
    getItem(Number(id)).then(setItem)
  }, [id])

  return (
    <div className="pb-36">
      <h1 className={status === 'finished' ? "line-through" : ""}>{item?.title}</h1>
      {finishedAgo()}
      {item && (
        <div className="fixed inset-x-0 bottom-0 mb-18">
          <div className="mx-auto flex max-w-lg gap-2 px-4">
            <DeleteButton item={item} />
            <StartButton item={item} onStarted={setItem} />
            <FinishButton item={item} onFinished={setItem} />
          </div>
        </div>
      )}
    </div>
  )

}

export default ItemPage
