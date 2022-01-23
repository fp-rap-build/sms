import "reflect-metadata";

import http from "http";

import { createConnection } from "typeorm";

import app from "./api/app";

const server = http.createServer(app);

const PORT = process.env.PORT || 1337;

createConnection()
  .then(async () => {
    server.listen(PORT, () => {
      console.log(`\n Server running on port ${PORT}! 💥 \n`);
    });

    server.timeout = 60 * 10 * 1000;
  })
  .catch((error) => console.log(error));