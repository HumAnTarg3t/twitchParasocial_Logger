const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  sendStreamerName: (twitchStreamers) => ipcRenderer.send("renderer-to-main-Window2", twitchStreamers),
});
