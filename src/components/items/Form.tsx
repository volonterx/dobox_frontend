import {createItem, type Item} from '@/api'
import { useFormStatus } from "react-dom";

interface FormProps {
  onCreated: (item_id: number | null) => void
  parent_id?: number
}

function Submit() {
  const status = useFormStatus()
  return <button type="submit" className="btn btn-primary join-item" disabled={status.pending}>Add</button>
}

function Form({ parent_id, onCreated }: FormProps) {

  async function addItem(formData: FormData) {
    const title = formData.get('title') as string
    const data = {title: title, parent_id: parent_id}
    const item = await createItem(data) as Item
    onCreated(item?.id)
  }

  return (
    <div className="mx-auto max-w-lg px-4">
      <form action={addItem} className="join w-full">
        <input name="title" type="text" placeholder="Add a new item" autoFocus className="input join-item w-full" />
        <Submit />
      </form>
    </div>
  )
}

export default Form