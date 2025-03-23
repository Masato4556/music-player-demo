import { atom } from 'jotai'

const audioAtom = atom<HTMLAudioElement | null>(null)

export const setAudioSrcAtom = atom(null, (_get, set, src: string) => {
  const audio = new Audio(src)
  set(audioAtom, audio)
})

export const controlAudioAtom = atom((get) => {
  const audio = get(audioAtom)
  return {
    play: (): void => {
      if (audio === null) {
        return
      }
      audio.play()
    },
    pause: (): void => {
      if (audio === null) {
        return
      }
      audio.pause()
    },
    stop: (): void => {
      if (audio === null) {
        return
      }
      audio.pause()
      audio.currentTime = 0
    }
  }
})
