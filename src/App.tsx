import {useEffect, useState} from 'react'
import './App.css'

interface Item {
  id: number
  title: string
  completed: boolean
  created_at: string
  updated_at: string
}

interface ItemForm {
  title: string
}

function App() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8000/items/")
      .then(res => res.json())
      .then(data => {
        setItems(data)
        setloading(false)
      })
  }, [])

  function addItem() {
    const itemText = document.getElementById('#item_text') as HTMLInputElement
    const newItem: ItemForm = {
      title: itemText.value,
    }
    fetch("http://localhost:8000/items/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then(res => res.json())
      .then(data => {
        setItems([...items, data])
        itemText.value = ""
      })
  }

  function toggleItemCompleted(item: Item) {
    fetch(`http://localhost:8000/items/${item.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({completed: !item.completed}),
    })
      .then(res => res.json())
      .then(updated => {
        setItems(items.map(i => (i.id === updated.id ? updated : i)))
      })
  }

  const status = loading ? 'loading' : (items.length === 0 ? 'empty' : 'ready')

  return (
    <div>
      <h1>Dobox</h1>
      <form>
        <input id="#item_text" type="text" placeholder="Add a new item" />
        <button type="submit" onClick={addItem}>Add</button>
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
