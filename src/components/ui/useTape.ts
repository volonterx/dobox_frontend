import { useEffect, useRef } from 'react'

const TAPE_ASPECTS = [2.178, 2.657, 2.983, 3.05, 3.123, 4.559]
const MAX_ASPECT = TAPE_ASPECTS[TAPE_ASPECTS.length - 1]
const SIMILAR = 0.08

function hash(text: string) {
  let h = 0
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
}

function pickTape(aspect: number, label: string) {
  const diff = TAPE_ASPECTS.map((a) => Math.abs(a - aspect) / aspect)
  const best = Math.min(...diff)
  const candidates = diff.flatMap((d, i) => (d - best <= SIMILAR ? [i] : []))
  return candidates[hash(label) % candidates.length] + 1
}

/** Picks the tape image matching the element's proportions (unless `auto` is off). With `capWidth` the element can't grow wider than the widest tape. */
export function useTape<T extends HTMLElement>(capWidth = false, auto = true) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const apply = () => {
      const { width, height } = el.getBoundingClientRect()
      if (!width || !height) return
      if (capWidth) el.style.maxWidth = `${Math.round(height * MAX_ASPECT)}px`
      if (!auto) return
      const n = pickTape(width / height, el.textContent ?? '')
      el.style.setProperty('--tape-img', `url(/tapes/tape-${n}.png)`)
    }
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(el)
    return () => observer.disconnect()
  }, [capWidth, auto])

  return ref
}
