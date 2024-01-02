const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  receive: (channel, func) => {
    ipcRenderer.on(channel, (_, ...args) => func(...args));
  },
});
