/* eslint-disable */
import { app, BrowserWindow, nativeTheme, Menu, Tray, ipcMain } from 'electron'
const path = require('path');

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = path.join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow
let tray

function createWindow () {
  const gotTheLock = app.requestSingleInstanceLock()

  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized())
        mainWindow.restore()
      mainWindow.show();
      mainWindow.focus()
    }
  })

  if (!gotTheLock) {
    app.quit();
    return;
  }

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    frame: false,
    backgroundColor: '#121212',
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: QUASAR_NODE_INTEGRATION,

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })

  mainWindow.removeMenu();
  mainWindow.maximize();

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('minimize',function(event){
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on('close', function (event) {
      if(!app.isQuiting){
          event.preventDefault();
          mainWindow.hide();
      } else {
        mainWindow = null;
      }

      return false;
  });

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Abrir', click:  function(){
        mainWindow.show();
        mainWindow.maximize();
    } },
    { label: 'Sair', click:  function(){
        app.isQuiting = true;
        app.quit();
    } }
  ]);

  tray = new Tray(path.join(__statics, '/logo-128x128.png'));
  tray.setToolTip('Anotações.')
  tray.setContextMenu(contextMenu)
  tray.on('double-click', () => {
    mainWindow.show();
    mainWindow.maximize();
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const userDataPath = app.getPath('userData');
const notesPath = path.join(userDataPath, 'notes.data');

ipcMain.on('get-notes', (event, arg) => {
  require('fs').readFile(notesPath, 'utf-8', (err, data) => {
    if (err) {
      data = '[]';
    }
    event.returnValue = data;
  });
})

ipcMain.on('set-notes', (event, arg) => {
  require('fs').writeFileSync(notesPath, arg);
})
