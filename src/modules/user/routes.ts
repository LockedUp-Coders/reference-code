import express, { Request, Response, response } from "express";

import UserOperations from "./controller";
import { ControllerResponse } from "./interface";

const router = express.Router();

router.post("/create", async ({ body }, res: Response) => {
  const response: ControllerResponse = await UserOperations.create(body);

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  });
});

router.post("/search", async ({ body }, res: Response) => {
  const response: ControllerResponse = await UserOperations.search(body);

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  });
});

router.put("/update", async ({ body }, res: Response) => {
  const response: ControllerResponse = await UserOperations.update(body);

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  });
});

export default router;
