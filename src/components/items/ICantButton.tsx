import TapeButton from '@/components/ui/TapeButton'

const MESSAGE = `If you feel anxious, take three deep breaths. It may be hard, but you've already done a million things in your life, and some of them were very stressful. You're still here, and you did them. You can do this one too.

Or maybe it's not a five-minute task? Maybe it seems too broad. Take a minute to think about it. Could you do just a tiny first step? Doing a task in three small steps over three days is better than staring at it for a week. Or maybe just spend five minutes thinking about it: how you would start, and what could help you. That counts too.`

function ICantButton() {
  return (
    <TapeButton tone="neutral" tape={3} className="btn-lg flex-1" onClick={() => alert(MESSAGE)}>
      I can't
    </TapeButton>
  )
}

export default ICantButton
