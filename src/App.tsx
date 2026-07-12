import {useEffect, useState} from 'react'
import {fetchItems, createItem, handleItemCompleted, type Item} from './api'
import './App.css'


function App() {
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
      <h1>Dobox</h1>
      <form onSubmit={addItem}>
        <input id="item_text" type="text" placeholder="Add a new item" />
        <button type="submit">Add</button>
      </form>
      {{
        loading: <p>Loading...</p>,
        empty: <p>No items yet.</p>,
        ready: (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <input type="checkbox" checked={item.completed} onChange={() => toggleItemCompleted(item)}></input>
                {item.title}
              </li>
            ))}
          </ul>
        ),
      }[status]}
    </div>
  )

}

export default App
