const { app, BrowserWindow, ipcMain } = require("electron");
const { readFileSync } = require("fs");
const path = require("path");
const url = require("url");
const tmi = require("tmi.js");
// const { log } = require("console");

const dataFromConfig = readFileSync("./config.json");
const streamerListFromConfig = JSON.parse(dataFromConfig).data;
// const dataFromConfig = data.data;

// console.log(streamerListFromConfig);

// const streamers = ["nmplol", "nmplol2", "noraexplorer"];
const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Adjusts to local time
};

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
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
streamerListFromConfig.forEach((streamer) => {
  const client = new tmi.Client({
    channels: [streamer],
  });
  client.connect();

  client.on("message", (channel, tags, message, self) => {
    // mainWindow.webContents.send("streamer-list", streamerListFromConfig);
    // console.log(tags);
    let timestamp = tags["tmi-sent-ts"];
    let readableDate = convertTimestamp(parseInt(timestamp));

    try {
      if (tags.mod == true || tags.badges.vip == 1 || streamerListFromConfig.includes(tags.username)) {
        // console.log(streamerListFromConfig.includes(tags.username));
        // const logMessage = `${channel} ${readableDate} ${tags["display-name"]}: ${message}`;
        const logMessage = {
          channel: channel,
          date_tmi_sent_ts: readableDate,
          username: tags["display-name"],
          message: message,
        };
        const ClientPayload = {
          messageInfo: logMessage,
          streamerListFromConfig: streamerListFromConfig,
        };
        // Send the log message to the renderer process
        mainWindow.webContents.send("log-message", ClientPayload);
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
