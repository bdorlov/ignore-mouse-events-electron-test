const {app, BrowserWindow, ipcMain} = require('electron') 
const url = require('url') 
const path = require('path')  

let win;

function createWindow() { 
   win = new BrowserWindow({
      webPreferences: {
         preload: path.join(__dirname, 'preload.js'),
         nodeIntegration: false,
         enableRemoteModule: false,
      },
      width: 1000,
      height: 800,
      transparent: true,
      backgroundColor: "#20FFFFFF",
      
      //opacity: 0.5
   });
   //win.webContents.openDevTools({mode: 'undocked'});
   win.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'index.html'), 
      protocol: 'file:', 
      slashes: true 
   }));
   win.setIgnoreMouseEvents(true, {forward: true});
   setInterval(function(){
      win.setAlwaysOnTop(true);
  }, 10);
   win.setMinimizable(false);
}

let forward = true;

ipcMain.on('change-ignoring', (event, arg) => {
   //console.log('event = ', event);
   //console.log('arg = ', arg);
   //win.webContents.send('msg', arg);

   win.setIgnoreMouseEvents(!arg, {forward: forward});
   if (arg) {
      win.setBackgroundColor("#BBFFFFFF");
   } else {
      win.setBackgroundColor("#20FFFFFF");
   }
});

ipcMain.on('toggle-forward', (event) => {
   forward = !forward;
   win.setIgnoreMouseEvents(true, {forward: forward});
   console.log('new forward: ', forward);
   win.webContents.send('update-forward', forward);
});

app.on('ready', createWindow);
