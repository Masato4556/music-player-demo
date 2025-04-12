import electronLogo from '@renderer/assets/electron.svg'
import { Button } from '../ui/button'
import { SeekBar } from './ProgressBar/SeekBar'
import { useSetAudio, useAudioControls } from './AudioContext'
import { Card, CardContent, CardHeader } from '../ui/card'
import { VolumeBar } from './VolumeBar'
import { BpmBar } from './BPMControl/BpmBar'

export const Player = (): JSX.Element => {
  const { openAudio } = useSetAudio()
  const { play, pause, stop } = useAudioControls()

  return (
    <Card className="w-full h-screen max-w-none mx-auto shadow-lg bg-gray-600">
      <CardHeader>
        <Button
          variant="default"
          size="sm"
          className="bg-white text-black hover:bg-gray-200"
          onClick={openAudio}
        >
          Open File
        </Button>
      </CardHeader>
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
        <SeekBar className="bg-gray-700 text-white" />
        <VolumeBar className="bg-gray-700 text-white" />
        <BpmBar></BpmBar>
      </CardContent>
    </Card>
  )
}
