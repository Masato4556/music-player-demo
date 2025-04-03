import { cn } from '@renderer/lib/utils'
import { Slider } from '../../ui/slider'
import { useAudioProgress } from '../AudioContext'
import { useOnValueChange } from './useOnValueChange'

type Props = React.ComponentProps<typeof Slider>

export const ProgressBar = (props: Props): JSX.Element => {
  const { currentTime, duration, seek } = useAudioProgress()
  console.log(duration)
  const onValueChange = useOnValueChange(duration, seek)

  return (
    <Slider
      value={[(currentTime / duration) * 100 || 0]}
      min={0}
      max={100}
      onValueChange={onValueChange}
      className={cn('w-full')}
      {...props}
    />
  )
}
