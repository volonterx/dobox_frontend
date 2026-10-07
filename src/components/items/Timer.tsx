import type {Item} from "@/api.ts";
import {getItemStatus} from "@/utils/itemStatus.ts";
import {useNow} from "@/hooks/useNow.ts";

function Timer({item}: {item: Item | null}) {

  if (!item)
    return ""

  const status = getItemStatus(item)

  if (status !== 'ongoing')
    return ""

  const now = useNow()
  const seconds = Math.floor((now - new Date(item.started_at!).getTime()) / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  const formattedTimer = `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}`

  return ( formattedTimer )
}

export default Timer