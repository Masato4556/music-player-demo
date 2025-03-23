import demoAudio from '@renderer/assets/demo.mp3'
import { Button } from '../ui/button'
import { ProgressBar } from './ProgressBar'
import { useSetAudio, useAudioControls } from './AudioContext'
import { useEffect } from 'react'

export const Player = (): JSX.Element => {
  const { setAudioSrc } = useSetAudio()
  const { play, pause, stop } = useAudioControls()

  useEffect(() => {
    setAudioSrc(demoAudio)
  }, [setAudioSrc])

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
