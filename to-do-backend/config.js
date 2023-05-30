require("dotenv").config();

const config = {
  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
  EXPRESS_PORT: process.env.EXPRESS_PORT,
};

module.exports = config;
