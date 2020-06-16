import express from "express";
import compression from "compression";
import cors from "cors";
import morgan from "./logging/morgan";
import database from "./modules/database/connect";

/**
 * Loading user modules
 */
import userModule from "./modules/user/routes";

database.connect();
const app = express();

// Middleware chain
app.use(express.json());
app.use(compression());
app.use(cors());

// Logging
app.use(morgan);

// Routes
// app.use("/", index);
app.use("/user", userModule);

export default app;
