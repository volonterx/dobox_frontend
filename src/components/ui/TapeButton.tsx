import type { ButtonHTMLAttributes, CSSProperties } from 'react'
import { useTape } from './useTape'

type Tone = 'primary' | 'success' | 'error' | 'neutral'

interface TapeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: Tone
  tape?: number
}

function TapeButton({ tone = 'primary', tape, className = '', style, children, ...props }: TapeButtonProps) {
  const ref = useTape<HTMLButtonElement>(true, tape === undefined)
  return (
    <button
      ref={ref}
      className={`btn tape tape-${tone} ${className}`}
      style={tape === undefined ? style : ({ '--tape-img': `url(/tapes/tape-${tape}.png)`, ...style } as CSSProperties)}
      {...props}
    >
      <span className="tape-label">{children}</span>
    </button>
  )
}

export default TapeButton
