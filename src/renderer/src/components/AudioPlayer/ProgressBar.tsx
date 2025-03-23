import { cn } from '@renderer/lib/utils'
import { Slider } from '../ui/slider'
import { useAudioProgress } from './AudioContext'

export const ProgressBar = (): JSX.Element => {
  const { currentTime, duration, seek } = useAudioProgress()

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event.target.value', event.target.value)
    const newTime = (Number(event.target.value) / 100) * duration
    seek(newTime)
  }
  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const slider = event.currentTarget.getBoundingClientRect()
    const clickPosition = event.clientX - slider.left
    const newValue = (clickPosition / slider.width) * 100
    const newTime = (newValue / 100) * duration
    seek(newTime)
  }

  return (
    <div className="w-[60%]">
      <Slider
        value={[(currentTime / duration) * 100 || 0]}
        min={0}
        max={100}
        onChange={handleSeek}
        onClick={onClick}
        className={cn('w-full')}
      />
    </div>
  )
}
