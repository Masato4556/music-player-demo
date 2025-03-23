import { useSetAtom } from 'jotai'
import { setAudioSrcAtom } from './music.atoms'
import { useEffect } from 'react'

export const useSetAudio = (src: string): void => {
  const setAudioAtom = useSetAtom(setAudioSrcAtom)
  useEffect(() => {
    setAudioAtom(src)
  }, [setAudioAtom, src])
}
