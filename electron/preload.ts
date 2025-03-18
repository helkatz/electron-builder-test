import { app, contextBridge, ipcRenderer } from 'electron'
contextBridge.exposeInMainWorld("electron", {
  version: () => ipcRenderer.sendSync("getVersion"),
});