import {createItem, type Item} from '@/api'
import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import TapeButton from '@/components/ui/TapeButton'

interface FormProps {
  onCreated: (item_id: number | null) => void
  parent_id?: number
}

function Submit() {
  const status = useFormStatus()
  return <TapeButton type="submit" tone="primary" tape={1} disabled={status.pending}>Add</TapeButton>
}

function Form({ parent_id, onCreated }: FormProps) {
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => input.current?.focus(), [])

  async function addItem(formData: FormData) {
    const title = formData.get('title') as string
    const data = {title: title, parent_id: parent_id}
    const item = await createItem(data) as Item
    document.querySelector('.scroll-under-header')?.scrollTo({ top: 0, behavior: "smooth" })
    onCreated(item?.id)
  }

  return (
    <div className="mx-auto max-w-lg px-4">
      <form action={addItem} className="flex items-center gap-3">
        <label className="paper flex-1">
          <input name="title" type="text" ref={input} placeholder="Add a new item" className="paper-input" />
        </label>
        <Submit />
      </form>
    </div>
  )
}

export default Form