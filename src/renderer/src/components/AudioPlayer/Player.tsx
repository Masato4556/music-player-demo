import demoAudio from '@renderer/assets/demo.mp3'
import electronLogo from '@renderer/assets/electron.svg'
import { Button } from '../ui/button'
import { ProgressBar } from './ProgressBar'
import { useSetAudio, useAudioControls } from './AudioContext'
import { useEffect } from 'react'
import { Card, CardContent } from '../ui/card'

export const Player = (): JSX.Element => {
  const { setAudioSrc } = useSetAudio()
  const { play, pause, stop } = useAudioControls()

  useEffect(() => {
    setAudioSrc(demoAudio)
  }, [setAudioSrc])

  return (
    <Card className="w-full h-screen max-w-none mx-auto shadow-lg bg-gray-600">
      <CardContent className="h-full flex flex-col justify-center items-center">
        <div className="w-full bg-gray-800 rounded-lg">
          <img src={electronLogo} alt="thumbnail" className="w-full object-cover rounded-lg" />
        </div>

        <div className="flex gap-4 my-4">
          <Button
            variant="default"
            size="sm"
            className="bg-white text-black hover:bg-gray-200"
            onClick={() => {
              play()
            }}
          >
            ▶️
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-white text-black hover:bg-gray-200"
            onClick={() => {
              pause()
            }}
          >
            ⏸️
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={() => {
              stop()
            }}
          >
            ⏹️
          </Button>
        </div>
        <ProgressBar className="bg-gray-700 text-white" />
      </CardContent>
    </Card>
  )
}
