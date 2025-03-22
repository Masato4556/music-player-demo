import demoAudio from '@renderer/assets/demo.mp3'
import { Button } from '../ui/button'

export const Player = () => {
  return (
    <>
      <audio controls>
        <source src={demoAudio}></source>
      </audio>
      <Button variant="secondary"> Ping main process</Button>
    </>
  )
}
