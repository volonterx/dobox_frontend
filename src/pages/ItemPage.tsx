import { useBackTo } from '@/hooks/useBackTo'
import {getItem, type Item} from "@/api.ts";
import {useEffect, useState, useRef} from "react";
import {useBlocker, useLocation, useNavigate, useParams, useSearchParams} from "react-router";
import { getItemStatus } from '@/utils/itemStatus'
import { StartButton, FinishButton, DeleteButton, FollowUpButton, Form, Card } from '@/components/items'
import { Sheets } from 'photocopier-ui'
import { useNavigateBack } from '@/hooks/useNavigateBack'

const sheets = Sheets.create({ scanDuration: 0, bar: 'none' })

function ItemPage() {
  const navigate = useNavigate()
  const navigateBack = useNavigateBack('/')
  const sheetRef = useRef<HTMLDivElement>(null)
  const leaving = useRef(false)

  useBackTo('/', navigateBack)

  const blocker = useBlocker(({ nextLocation }) => !nextLocation.pathname.startsWith('/items/'))

  useEffect(() => {
    if (blocker.state !== 'blocked') return
    if (leaving.current) {
      blocker.reset()
      return
    }
    leaving.current = true
    const el = sheetRef.current
    const done = el ? sheets.dismiss(el) : Promise.resolve()
    done.then(() => blocker.proceed())
  }, [blocker])

  const { id } = useParams()
  const [item, setItem] = useState<Item>()
  const [params, setSearchParams] = useSearchParams()
  const showForm = params.has('new')

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [])

  const location = useLocation()
  const pendingItemId = useRef<number | null>(null)

  function redirectToNewItem(item_id: number | null) {
    if (!item_id) return
    if (location.key === 'default') {
      navigate(`/items/${item_id}`, { replace: true })
      return
    }
    pendingItemId.current = item_id
    navigate(-1)
  }

  useEffect(() => {
    if (pendingItemId.current === null || params.has('new')) return
    const next = pendingItemId.current
    pendingItemId.current = null
    navigate(`/items/${next}`, { replace: true })
  }, [location.key, params, navigate])

  useEffect(() => {
    getItem(Number(id)).then(setItem)
  }, [id])

  const scan = params.has('scan')

  const opened = useRef(false)

  useEffect(() => {
    const el = sheetRef.current
    if (!item || !el) return
    if (opened.current) {
      sheets.reveal(el, { scanDuration: 1000, bar: 'light' as const })
    } else {
      opened.current = true
      sheets.present(el, scan ? { scanDuration: 2000, bar: 'light' as const } : undefined)
    }
  }, [item?.id])

  if (!item) return <span className="loading loading-spinner mx-auto mt-16 block" />

  const status = getItemStatus(item)

  return (

    <div ref={sheetRef} hidden className="paper-sheet top-16 fixed inset-0 overflow-hidden bg-base-100 z-10">
      <div className="relative z-[1] h-full overflow-auto">
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

        <div className="fixed inset-x-0 bottom-0 bg-transparent pt-10 pb-10">
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
      </div>

    </div>

  )

}

export default ItemPage
