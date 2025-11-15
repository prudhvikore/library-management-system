import { NextFunction, Response, Request } from "express";
import custom_error from "../utils/errors/custom_errors";

async function error_handler(
  error: custom_error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error) {
    if (!error.message) {
      error.message = "something went wrong";
      req.logger.info("getting books failed coz something went wrong");
    }
    return res.status(error.status_code || 500).send({
      message:
        error.message === "Error" ? "something went wrong" : error.message,
    });
  }
  // next();
}

export default error_handler;
