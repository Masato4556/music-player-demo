import { Player } from './components/AudioPlayer/Player'
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
