const fs = require("fs");
const path = require("path");

// function createConfigFileIfNotExists() {
//   const configFilePath = path.join(__dirname, "..", "config.json");
//   console.log(__dirname);

//   fs.access(configFilePath, fs.constants.F_OK, (err) => {
//     if (err) {
//       console.log("config.json does not exist, creating...");
//       const defaultConfig = {
//         // You can define the default content of config.json here
//         data: [],
//       };

//       fs.writeFile(configFilePath, JSON.stringify(defaultConfig, null, 2), (err) => {
//         if (err) {
//           console.error("Error creating config file:", err);
//         } else {
//           console.log("config.json created successfully.");
//         }
//       });
//     } else {
//       console.log("config.json already exists.");
//     }
//   });
// }

function createConfigFileIfNotExists() {
  return new Promise((resolve, reject) => {
    const configFilePath = path.join(__dirname, "..", "config.json");
    console.log(__dirname);

    fs.access(configFilePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log("config.json does not exist, creating...");
        const defaultConfig = {
          // You can define the default content of config.json here
          data: [],
        };

        fs.writeFile(configFilePath, JSON.stringify(defaultConfig, null, 2), (err) => {
          if (err) {
            console.error("Error creating config file:", err);
          } else {
            console.log("config.json created successfully.");
          }
        });
      } else {
        console.log("config.json already exists.");
      }
    });
    resolve();
  });
}

module.exports = { createConfigFileIfNotExists };
