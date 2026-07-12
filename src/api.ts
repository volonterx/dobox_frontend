const API_URL = import.meta.env.VITE_API_URL

export interface Item {
  id: number
  title: string
  completed: boolean
  created_at: string
  updated_at: string
}

export function fetchItems(): Promise<Item[]> {
  return fetch(`${API_URL}/items/`).then((res) => res.json())
}

export function createItem(title: string): Promise<Item> {
  return fetch(`${API_URL}/items/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, completed: false }),
  }).then((res) => res.json())
}

export function handleItemCompleted(item: Item): Promise<Item> {
  return fetch(`${API_URL}/items/${item.id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !item.completed }),
  }).then((res) => res.json())
}
