import { cn } from '@renderer/lib/utils'
import { useAudioVolume } from './AudioContext'
import { Slider } from '../ui/slider'
import { Volume } from './Volume'

type Props = React.ComponentProps<typeof Slider>

export const VolumeBar = (props: Props): JSX.Element => {
  const { volume, changeVolume } = useAudioVolume()

  const onValueChange = (value: number[]) => {
    if (value[0] === undefined) {
      throw new Error('Value is undefined')
    }
    changeVolume(new Volume(value[0]))
  }

  return (
    <div className={cn('w-full')}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">{volume.getValue().toString()}</span>
      </div>
      <Slider
        value={[volume.getValue()]}
        min={0}
        max={100}
        onValueChange={onValueChange}
        {...props}
      />
    </div>
  )
}
