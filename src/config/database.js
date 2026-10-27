const path = require("node:path");
const { Pool } = require("pg");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

if (!process.env.DB_NAME) {
  throw new Error("DB_NAME es obligatorio y debe configurarse en el archivo .env");
}

const pool = new Pool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 10,
});

module.exports = pool;
