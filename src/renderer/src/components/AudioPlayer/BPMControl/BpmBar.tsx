import { cn } from '@renderer/lib/utils'
import { useBpm } from './useBpm'
import { Slider } from '../../ui/slider'
import { useEffect } from 'react'

type Props = React.ComponentProps<typeof Slider>

export const BpmBar = (props: Props): JSX.Element => {
  const { getBpm, setBpm, setCallback, start, stop } = useBpm()

  useEffect(() => {
    const callback = () => {
      console.log('BPM callback triggered')
    }
    setCallback(callback)
  }, [setCallback])

  const onValueChange = (value: number[]) => {
    if (value[0] === undefined) {
      throw new Error('Value is undefined')
    }
    setBpm(value[0])
  }

  return (
    <div className={cn('w-full my-2')}>
      <div className="flex items-center justify-between  mb-2">
        <span className="text-xs text-muted-foreground">BPM: {getBpm().toString()}</span>
      </div>
      <Slider
        value={[getBpm()]}
        min={0}
        max={120}
        onValueChange={onValueChange}
        onPointerDown={() => {
          stop()
        }}
        onPointerUp={() => {
          start()
        }}
        {...props}
      />
    </div>
  )
}
