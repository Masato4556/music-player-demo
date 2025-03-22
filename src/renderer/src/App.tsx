import Versions from './components/Versions'
import { Player } from './components/AudipPlayer/Player'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <Player></Player>
      <Versions></Versions>
    </>
  )
}

export default App
