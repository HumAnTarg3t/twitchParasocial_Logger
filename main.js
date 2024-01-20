const { app, BrowserWindow, ipcMain } = require("electron");
const { readFileSync, writeFile } = require("fs");
const { convertTimestamp } = require("./utils/convertTimestamp");
const { createConfigFileIfNotExists } = require("./utils/createConfigFileIfNotExists");
const fs = require("fs");
const path = require("path");
const url = require("url");
const tmi = require("tmi.js");

try {
  const dataFromConfig = readFileSync("./config.json");
  const streamerListFromConfig = JSON.parse(dataFromConfig).data;

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
        pathname: path.join(__dirname, "/client/index.html"),
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
      let timestamp = tags["tmi-sent-ts"];
      let readableDate = convertTimestamp(parseInt(timestamp));
      const skipableUsernames = [
        "nightbot",
        "streamelements",
        "fossabot",
        "schnozebot",
        "botrixoficial",
        "thepositivebot",
      ];
      // (streamerListFromConfig.includes(tags.username) && !skipableUsernames.includes(tags.username)) ||
      // (tags.mod == true && !skipableUsernames.includes(tags.username)) ||
      // (tags.badges.vip == 1 && !skipableUsernames.includes(tags.username)) ||
      // (tags.badges.partner == 1 && !skipableUsernames.includes(tags.username))
      try {
        if (true) {
          // console.log(streamerListFromConfig.includes(tags.username) && !skipableUsernames.includes(tags.username));
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
        } else {
          // console.log("Not logging", !skipableUsernames.includes(tags.username));
          // console.log(!skipableUsernames.includes(tags.username));
        }
      } catch (error) {
        return null;
      }
    });
  });

  // IPC listener for messages from renderer process (if needed)
  ipcMain.on("renderer-to-main-Window1", (event, arg) => {
    // Handle messages from renderer process if needed
  });
} catch (error) {
  createConfigFileIfNotExists();

  let mainWindow;

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "preloadConfig.js"),
      },
    });

    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "/client/config.html"),
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

  app.whenReady().then(() => {
    let arrayWithStreamerNames = [];

    ipcMain.on("renderer-to-main-Window2", (event, twitchStreamers) => {
      arrayWithStreamerNames.push(twitchStreamers);
      // console.log(data);
      const defaultConfig = {
        // You can define the default content of config.json here
        data: arrayWithStreamerNames,
      };

      // defaultConfig.data.push(twitchStreamers);
      fs.writeFile("./config.json", JSON.stringify(defaultConfig, null, 2), (err) => {
        if (err) {
          console.error("Error creating config file:", err);
        } else {
          console.log("config.json created successfully.");
        }
      });
    });
    createWindow();
  });
}
