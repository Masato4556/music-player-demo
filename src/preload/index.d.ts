import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}

export interface API {
  openFile: () => Promise<string>
  readFile: (filePath: string) => Promise<string>
}
