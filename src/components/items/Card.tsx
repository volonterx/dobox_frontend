import type {Item} from "@/api.ts";
import {getItemStatus} from "@/utils/itemStatus.ts";
import StatusBadge from "./StatusBadge";
import Timer from "./Timer";
import Elapsed from "./Elapsed";
import {formatDistanceToNow} from "date-fns";
import {useDeleteItem} from '@/hooks/useDeleteItem'
import {useEditTitle} from '@/hooks/useEditTitle'

interface CardProps {
  item: Item;
  editable?: boolean;
  additionalClasses?: string;
}


function Card({ item, additionalClasses, editable = false }: CardProps) {

  const status = getItemStatus(item)
  const { editing, startEditing, saveTitle, inputProps } = useEditTitle(item)
  const { remove, pending } = useDeleteItem(item)

  return (
    <div className={additionalClasses}>
      <StatusBadge status={status} />
      <h2 className={`text-2xl p-2 font-semibold break-words ${status === 'finished' ? 'line-through opacity-60' : ''}`}>
        <textarea
          name="item_title"
          id="item_title"
          rows={1}
          className="editable_area"
          {...inputProps}
        />
        {editable && !editing ? (
          <div>
            <button type="button" className="ml-2 text-sm font-normal underline" onClick={() => startEditing()}>
              Edit
            </button>
            <button type="button" className="ml-2 text-sm font-normal underline" disabled={pending} onClick={remove}>
              Delete
            </button>
          </div>
        ) : editing ? (
          <div>
            <button type="button" className="ml-2 text-sm font-normal underline" onMouseDown={(e) => e.preventDefault()} onClick={() => saveTitle()}>
              Save
            </button>
          </div>
        ) : null}
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
    </div>
  );
}

export default Card