import { Seconds } from '@renderer/components/AudioPlayer/Seconds'
import { useCallback } from 'react'

export const useOnValueChange = (duration: Seconds, seek: (time: number) => void) => {
  return useCallback(
    ([value]: number[]) => {
      if (value === undefined) {
        throw new Error('Value is undefined')
      }
      const percentage = value / 100
      seek(percentage * duration.value())
    },
    [duration, seek]
  )
}
