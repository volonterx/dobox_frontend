import { useEffect, useRef, useState } from 'react'
import { updateItem, type Item } from '@/api'

export function useEditTitle(item: Item) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(item.title)
  const saved = useRef(item.title)
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!editing || !el) return
    el.focus()
    el.setSelectionRange(el.value.length, el.value.length)
  }, [editing])

  async function save() {
    await updateItem(item.id, { title })
    saved.current = title
    setEditing(false)
  }

  const inputProps = {
    ref,
    value: title,
    readOnly: !editing,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value),
    onBlur: () => setEditing(false),
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter') { e.preventDefault(); save(); e.currentTarget.blur() }
      if (e.key === 'Escape') { setTitle(saved.current); e.currentTarget.blur() }
    },
  }

  return { editing,
           saveTitle: () => save(),
           startEditing: () => setEditing(true),
           inputProps }
}
