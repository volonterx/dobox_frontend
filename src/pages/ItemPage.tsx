import { useBackTo } from '@/hooks/useBackTo'
import {getItem, type Item} from "@/api.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router";
import { getItemStatus } from '@/utils/itemStatus'
import { StartButton, FinishButton, DeleteButton, FollowUpButton, Form, Card } from '@/components/items'

function ItemPage() {
  useBackTo('/')

  const { id } = useParams()
  const [item, setItem] = useState<Item>()
  const [params, setSearchParams] = useSearchParams()
  const showForm = params.has('new')


  const navigate = useNavigate()

  function redirectToNewItem(item_id: number | null) {
    if (item_id) {
      setSearchParams('')
      navigate(`/items/${item_id}`)
    }
  }

  useEffect(() => {
    getItem(Number(id)).then(setItem)
  }, [id])

  if (!item) return <span className="loading loading-spinner mx-auto mt-16 block" />

  const status = getItemStatus(item)

  return (

    <div className="flex flex-col items-center gap-3 pt-8 pb-36 text-center">
      <Card item={item}/>

      {
        item.parent ? (
          <>
            <span className="text-3xl opacity-60">↑</span>
            <Card item={item.parent} additionalClasses={"opacity-60"}/>
          </>
          ) : ("")
      }

      <div className="fixed inset-x-0 bottom-0 bg-base-100 pt-2 pb-18">
        {
          showForm ? (
            <Form parent_id={item.id} onCreated={(item_id: number | null) => redirectToNewItem(item_id)} />
          ) : (
            <div className="mx-auto flex max-w-lg gap-2 px-4">
              <DeleteButton item={item} />
              {
                  status === 'finished' ? (
                  <FollowUpButton item={item} onClick={() => setSearchParams({ new: '1' })} />
                ) : (
                  <>
                    <StartButton item={item} onStarted={setItem} />
                    <FinishButton item={item} onFinished={setItem} />
                  </>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )

}

export default ItemPage
