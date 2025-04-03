import { BrowserWindow, dialog, Menu, MenuItemConstructorOptions } from 'electron'

// 参考: https://zenn.dev/sprout2000/books/3691a679478de2/viewer/13548
export const createMenu = (browserWindow: BrowserWindow) => {
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open...',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            return (
              dialog
                /**
                 * ダイアログをモーダルにしたい場合は
                 * 第1引数に BrowserWindow インスタンスを渡す（省略可）
                 */
                .showOpenDialog(browserWindow, {
                  /**
                   * 'openFile' - 単一のファイル
                   * 'openDirectory' - 単一のディレクトリ
                   * 'multiSelections' - 複数選択可にする
                   * 'showHiddenFiles' - ドットファイルも選択可にする
                   */
                  properties: ['openFile', 'showHiddenFiles'],
                  title: 'ファイルを選択する',
                  filters: [
                    {
                      name: '画像ファイル',
                      extensions: ['png', 'jpg', 'jpeg']
                    }
                  ]
                })
                /**
                 * result: Electron.OpenDialogReturnValue
                 * ユーザー操作から返ってくる Promise (=result) に
                 * キャンセルされたか否かとファイルパスの配列が含まれている
                 * result.canceled: boolean
                 * result.filePaths: string[]
                 */
                .then((result) => {
                  // キャンセルボタンが押されたとき
                  if (result.canceled) return

                  // レンダラープロセスへファイルのフルパスを送信
                  // "menu-open" チャンネルへ送信する
                  browserWindow.webContents.send('menu-open', result.filePaths[0])
                })
                .catch((err) => console.log(`Error: ${err}`))
            )
          }
        }
      ]
    },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' },
    { role: 'help', submenu: [{ role: 'about' }] }
  ]

  if (process.platform === 'darwin') template.unshift({ role: 'appMenu' })

  return Menu.buildFromTemplate(template)
}
