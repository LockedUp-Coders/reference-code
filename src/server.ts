import dotenv from "dotenv";
import app from "./app";
import http from "http";
import logger from "./modules/logging/logger";
dotenv.config();

const PORT: number = Number(process.env.PORT) || 8080;

const server = http.createServer(app);

server.listen(PORT, (): void => {
  logger.info(`started server on port ${PORT}`);
});
