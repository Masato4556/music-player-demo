import { Player } from './components/AudioPlayer/Player'
import { BpmBar } from './components/AudioPlayer/BPMControl/BpmBar'
import { AudioProvider } from './components/AudioPlayer/AudioContext'

function App(): JSX.Element {
  return (
    <>
      <AudioProvider>
        <Player />
      </AudioProvider>
    </>
  )
}

export default App
