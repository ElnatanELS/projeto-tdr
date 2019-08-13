//Mongodb spawn process
const spawn = require('child_process').spawn;
const pipe = spawn('mongod', [' — port', '27018']);
pipe.stdout.on('data', function (data) {
 console.log(data.toString('utf8'));
});
pipe.stderr.on('data', (data) => {
 console.log(data.toString('utf8'));
});
pipe.on('close', (code) => {
 console.log('Process exited with code: '+ code);
});

// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
require('./server.js')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      allowEval: false
    },
    icon: './dist/assets/img/favicon.png',
    show: false,
    fullscreen: true,
    options:{
			fullscreen:true
		}
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./dist/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.once("ready-to-show", ()=>{
    mainWindow.show();
  })

  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>{
  createWindow();

  const template = [
    {
      label: 'Sair',
      role: 'close' 
    },
    {
      label: 'Tela Cheia',
      role: 'togglefullscreen' 
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu)

})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

