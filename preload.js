const electron = require('electron');


electron.contextBridge.exposeInMainWorld(
    "electron",
    {
        ipcRenderer: { ...electron.ipcRenderer, on: electron.ipcRenderer.on },
        listen: callback => electron.ipcRenderer.on('update-forward', callback),
    }
);

// electron.ipcRenderer.on('msg', (event, arg) => {
//     console.log('+++', arg);
// });