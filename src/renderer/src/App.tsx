import Versions from './components/Versions'
import { Player } from './components/AudioPlayer/Player'
import { AudioProvider } from './components/AudioPlayer/AudioContext'

function App(): JSX.Element {
  return (
    <>
      <AudioProvider>
        <Player />
      </AudioProvider>

      <Versions />
    </>
  )
}

export default App
