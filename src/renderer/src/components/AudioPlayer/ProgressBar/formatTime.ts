import { Seconds } from '../Seconds'

export const formatTime = (seconds: Seconds): string => {
  const formattedHours = Math.floor(seconds.value() / 3600).toString()

  const formattedMinutes = Math.floor((seconds.value() % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const formattedSeconds = Math.floor(seconds.value() % 60)
    .toString()
    .padStart(2, '0')

  if (formattedHours !== '0') {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  }
  return `${formattedMinutes}:${formattedSeconds}`
}
