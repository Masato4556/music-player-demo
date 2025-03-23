import demoAudio from '@renderer/assets/demo.mp3'
import { Button } from '../ui/button'
import { useMusic } from './useAudio'
import { ProgressBar } from './ProgressBar'

export const Player = () => {
  const { play, pause, stop } = useMusic(demoAudio)
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
