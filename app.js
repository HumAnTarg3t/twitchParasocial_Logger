const tmi = require("tmi.js");
// require("dotenv").config();

const streamers = ["fanfan", "shroud"];
const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Adjusts to local time
};

streamers.forEach((streamer) => {
  const client = new tmi.Client({
    // identity: {
    //   username: process.env.userName,
    //   password: process.env.passWord,
    // },
    channels: [streamer],
  });
  client.connect();

  client.on("message", (channel, tags, message, self) => {
    let timestamp = tags["tmi-sent-ts"];

    let readableDate = convertTimestamp(parseInt(timestamp));
    // console.log(readableDate);

    try {
      if (tags.mod == true || tags.badges.vip == 1) {
        console.log(`${channel} ${readableDate} ${tags["display-name"]}: ${message}`);
      }
    } catch (error) {
      return null;
    }
  });
});
