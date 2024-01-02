const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const tmi = require("tmi.js");

const streamers = ["fanfan", "shroud", "ray__c"];
const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Adjusts to local time
};

let mainWindow;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // Open DevTools if needed
  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

streamers.forEach((streamer) => {
  const client = new tmi.Client({
    channels: [streamer],
  });
  client.connect();

  client.on("message", (channel, tags, message, self) => {
    let timestamp = tags["tmi-sent-ts"];
    let readableDate = convertTimestamp(parseInt(timestamp));

    try {
      if (tags.mod == true || tags.badges.vip == 1) {
        const logMessage = `${channel} ${readableDate} ${tags["display-name"]}: ${message}`;
        // Send the log message to the renderer process
        mainWindow.webContents.send("log-message", logMessage);
      }
    } catch (error) {
      return null;
    }
  });
});

// IPC listener for messages from renderer process (if needed)
ipcMain.on("renderer-to-main", (event, arg) => {
  // Handle messages from renderer process if needed
});
