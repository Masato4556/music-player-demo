import { useMemo } from 'react'

export const useMusic = (src: string) => {
  return useMemo(() => {
    const music = new Audio(src)
    return {
      play: () => {
        music.play()
      },
      pause: () => {
        music.pause()
      },
      stop: () => {
        music.pause()
        music.currentTime = 0
      }
    }
  }, [src])
}
