import { createItem } from '@/api'
import { useFormStatus } from "react-dom";

interface FormProps {
  onCreated: () => void
}

function Submit() {
  const status = useFormStatus()
  return <button type="submit" className="btn btn-primary join-item" disabled={status.pending}>Add</button>
}

function Form({ onCreated }: FormProps) {

  async function addItem(formData: FormData) {
    const title = formData.get('title') as string
    await createItem(title)
    onCreated()
  }

  return (
    <form action={addItem} className="join w-full">
      <input name="title" type="text" placeholder="Add a new item" className="input join-item w-full" />
      <Submit />
    </form>
  )
}

export default Form