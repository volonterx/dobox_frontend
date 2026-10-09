import type {Item} from "@/api.ts";
import {getItemStatus} from "@/utils/itemStatus.ts";
import StatusBadge from "./StatusBadge";
import Timer from "./Timer";
import Elapsed from "./Elapsed";
import {formatDistanceToNow} from "date-fns";

interface CardProps {
  item: Item;
  additionalClasses?: string;
}


function Card({ item, additionalClasses }: CardProps) {

  const status = getItemStatus(item)


  return (
    <div className={additionalClasses}>
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
    </div>
  );
}

export default Card