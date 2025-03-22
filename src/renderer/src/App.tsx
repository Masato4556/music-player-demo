import Versions from './components/Versions'
import { Button } from './components/ui/button'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <Button variant="secondary"> Ping main process</Button>
      <Versions></Versions>
    </>
  )
}

export default App
