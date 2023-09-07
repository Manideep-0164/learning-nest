// import { createClient } from 'redis';
const Redis = require("redis");
require("dotenv").config();

const client = Redis.createClient({
  password: process.env.R_PASSWORD,
  socket: {
    host: process.env.R_HOST,
    port: process.env.R_PORT,
  },
});

module.exports = { client };
