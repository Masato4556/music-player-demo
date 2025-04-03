import { useCallback } from 'react'

export const useOnValueChange = (duration: number, seek: (time: number) => void) => {
  return useCallback(
    ([value]: number[]) => {
      if (value === undefined) {
        throw new Error('Value is undefined')
      }
      if (duration <= 0) {
        throw new Error('Duration must be greater than 0')
      }
      const percentage = value / 100
      seek(percentage * duration)
    },
    [duration, seek]
  )
}
