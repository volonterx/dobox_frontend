import {useEffect, useState} from 'react'
import {fetchItems, getRandomItem, type Item, type ItemId} from '@/api'
import {useNavigate, useSearchParams} from 'react-router'
import { Form, Timer } from '@/components/items'
import {getItemStatus} from "@/utils/itemStatus.ts";

function ItemsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setloading] = useState(true)
  const navigate = useNavigate()
  const [params, setSearchParams] = useSearchParams()
  const showForm = params.has('new')

  function loadItems() {
    return fetchItems()
      .then(setItems)
      .finally(() => setloading(false))
  }

  async function redirectToRandomItem() {
    const randomItem = await getRandomItem() as ItemId
    navigate(`/items/${randomItem.id}`)
  }


  useEffect(() => {
    loadItems()
  }, [])

  function renderList() {
    if (loading) return <p>Loading...</p>
    if (items.length === 0) return <p>No items yet.</p>
    return (
      <ul className="list">
        {items.map((item) => (
          <li key={item.id}
              className={`flex list-row items-center justify-between cursor-pointer ${getItemStatus(item) === 'finished' ? 'line-through' : ''}`}
              onClick={() => navigate(`/items/${item.id}`)}>
            <div>{item.title}</div>
            <div><Timer item={item}/></div>
          </li>
        ))}
      </ul>
    )
  }

  function renderFooter() {
    if (showForm) {
      return <Form onCreated={() => { navigate(-1); loadItems() }}/>
    }
    return (
      <div className="mx-auto flex max-w-lg gap-2 px-4">
        <button className="btn btn-lg flex-1" onClick={redirectToRandomItem}>Random</button>
        <button className="btn btn-primary btn-lg flex-1" onClick={() => setSearchParams({ new: '1' })}>Add new</button>
      </div>
    )
  }

  return (
    <div className="pb-36">
      {renderList()}
      <div className="fixed inset-x-0 bottom-0 bg-base-100 pt-2 pb-18">
        {renderFooter()}
      </div>
    </div>
  )

}

export default ItemsPage
