import {useEffect, useState} from 'react'
import {fetchItems, createItem, handleItemCompleted, type Item} from './api'

function TodoPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    fetchItems()
      .then(data => {
        setItems(data)
        setloading(false)
      })
  }, [])

  function addItem(e: React.SubmitEvent) {
    e.preventDefault()
    const itemText = document.getElementById('item_text') as HTMLInputElement
    createItem(itemText.value).then((newItem) => {
      setItems([...items, newItem])
      itemText.value = ""
    })
  }


  function toggleItemCompleted(item: Item) {
    handleItemCompleted(item)
      .then(updated => {
        setItems(items.map(i => (i.id === updated.id ? updated : i)))
      })
  }

  const status = loading ? 'loading' : (items.length === 0 ? 'empty' : 'ready')

  return (
    <div>
      <form onSubmit={addItem} className="join mb-4 w-full">
        <input id="item_text" type="text" placeholder="Add a new item" className="input join-item w-full" />
        <button type="submit" className="btn btn-primary join-item">Add</button>
      </form>
      {{
        loading: <p>Loading...</p>,
        empty: <p>No items yet.</p>,
        ready: (
          <ul className="list">
            {items.map((item) => (
              <li key={item.id} className="list-row items-center">
                <input type="checkbox" className="checkbox" checked={item.completed} onChange={() => toggleItemCompleted(item)}></input>
                {item.title}
              </li>
            ))}
          </ul>
        ),
      }[status]}
    </div>
  )

}

export default TodoPage
