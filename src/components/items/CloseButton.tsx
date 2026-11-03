import TapeButton from '@/components/ui/TapeButton'
import {useNavigateBack} from "@/hooks/useNavigateBack.ts";


function CloseButton() {
  const navigateBack = useNavigateBack('/')

  return (
    <TapeButton tone="neutral" tape={2} className="btn-lg flex-1" onClick={navigateBack}>
      Close
    </TapeButton>
  )
}

export default CloseButton
