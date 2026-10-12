import {useEffect, useState} from 'react'
import {fetchItems, getRandomItem, type Item, type ItemId} from '@/api'
import {useNavigate, useSearchParams, Outlet} from 'react-router'
import { Form, Timer } from '@/components/items'
import {getItemStatus} from "@/utils/itemStatus.ts";
import TapeButton from '@/components/ui/TapeButton'

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
    navigate(`/items/${randomItem.id}?scan=true`)
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
        <TapeButton tone="neutral" tape={5} className="btn-lg flex-1" onClick={redirectToRandomItem}>Random</TapeButton>
        <TapeButton tone="primary" tape={3} className="btn-lg flex-1" onClick={() => setSearchParams({ new: '1' })}>Add new</TapeButton>
      </div>
    )
  }

  return (
    <div className="pb-36">
      {renderList()}
      <Outlet />
      <div className="fixed inset-x-0 bottom-0 bg-transparent pt-10 pb-10 z-1">
        {renderFooter()}
      </div>
    </div>
  )

}

export default ItemsPage
