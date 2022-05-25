require("dotenv").config();
const path = require("path");

module.exports = {
  db: {
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "docker",
    dialect: "postgres",
  },
  debug: {
    stackSize: 4,
  },
  i18next: {
    translationFilePath: path.resolve(
      __dirname,
      "..",
      "locales/{{lng}}/{{ns}}.json"
    ),
  },
  host: "localhost:9001",
  https: {
    enabled: false,
  },
  port: process.env.PORT || 9001,
  shutdown: {
    appKill: 1000,
    serverClose: 100,
  },
};
