import demoAudio from '@renderer/assets/demo.mp3'
import { Button } from '../ui/button'
import { useAudioControls } from './useAudioControls'
import { ProgressBar } from './ProgressBar'
import { useSetAudio } from './useSetAudio'

export const Player = (): JSX.Element => {
  useSetAudio(demoAudio)
  const { play, pause, stop } = useAudioControls()
  return (
    <>
      <Button
        onClick={() => {
          play()
        }}
      >
        ▶️
      </Button>
      <Button
        onClick={() => {
          pause()
        }}
      >
        ⏸️
      </Button>
      <Button
        onClick={() => {
          stop()
        }}
      >
        ⏹️
      </Button>
      <ProgressBar />
    </>
  )
}
