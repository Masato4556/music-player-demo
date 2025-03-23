import { useAtomValue } from 'jotai'
import { controlAudioAtom } from './music.atoms'

type AudioControls = {
  play: () => void
  pause: () => void
  stop: () => void
}

export const useAudioControls = (): AudioControls => {
  return useAtomValue(controlAudioAtom)
}
