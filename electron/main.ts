// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require("url"); 

// Error Handling
process.on('uncaughtException', (error) => {
    console.error("Unexpected error: ", error);
});
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        }
    });

    const serve = false // !app.isPackaged;
    const basePath = !serve ? app.getAppPath() : path.join(__dirname, "..");
    if(!serve) {
      const pathname = path.join(basePath, "dist", "electron-builder-test", "browser", "index.html")
      console.log("load path", {dirname: __dirname, pathname})
      win.loadURL(url.format({
        pathname,
        protocol: 'file:',
        slashes: true
      }));
    } else {
      win.loadURL('http://localhost:4300');
    }
}
// App Lifecycle
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});