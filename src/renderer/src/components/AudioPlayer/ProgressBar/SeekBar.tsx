import { cn } from '@renderer/lib/utils'
import { Slider } from '../../ui/slider'
import { useAudioProgress } from '../AudioContext'
import { useOnValueChange } from './useOnValueChange'
import { formatTime } from './formatTime'

type Props = React.ComponentProps<typeof Slider>

export const SeekBar = (props: Props): JSX.Element => {
  const { currentTime, duration, seek } = useAudioProgress()
  const onValueChange = useOnValueChange(duration, seek)

  return (
    <div className={cn('w-full my-2')}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      <Slider
        value={[(currentTime.value() / duration.value()) * 100 || 0]}
        min={0}
        max={100}
        onValueChange={onValueChange}
        {...props}
      />
    </div>
  )
}
