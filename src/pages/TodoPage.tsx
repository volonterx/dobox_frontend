import {useEffect, useState} from 'react'
import {fetchItems, type Item} from '@/api'
import {useNavigate} from 'react-router'
import Form from '@/components/items/Form'
import {getItemStatus} from "@/utils/itemStatus.ts";
import Timer from "@/components/items/Timer.tsx";

function TodoPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setloading] = useState(true)
  const navigate = useNavigate()

  function loadItems() {
    return fetchItems()
      .then(setItems)
      .finally(() => setloading(false))
  }

  useEffect(() => {
    loadItems()
  }, [])

  const status = loading ? 'loading' : (items.length === 0 ? 'empty' : 'ready')

  return (
    <div className="pb-36">
      {{
        loading: <p>Loading...</p>,
        empty: <p>No items yet.</p>,
        ready: (
          <ul className="list">
            {items.map((item) => (
              <li key={item.id}
                  className={`flex list-row items-center justify-between cursor-pointer ${getItemStatus(item) === 'finished' ? 'line-through' : ''}`}
                  onClick={() => navigate(`/items/${item.id}`)}
              >
                <div>{item.title}</div>
                <div><Timer item={item}/></div>
              </li>
            ))}
          </ul>
        ),
      }[status]}
      <div className="fixed inset-x-0 bottom-0 bg-base-100 pt-2 pb-18">
        <div className="mx-auto max-w-lg px-4">
          <Form onCreated={loadItems}/>
        </div>
      </div>
    </div>
  )

}

export default TodoPage
