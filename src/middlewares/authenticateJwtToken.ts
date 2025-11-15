import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

import "dotenv/config";

const authenticateJwtToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorHeader = request.headers["authorization"];
  if (authorHeader === undefined) {
    response.status(401).send({ message: "JWT token is missing" });
    return;
  }

  const jwtToken = authorHeader.split(" ")[1];
  const secret = process.env.SECRET;

  if (!secret) {
    response.status(500).send({ message: "Server configuration error" });
    return;
  }

  jwt.verify(
    jwtToken,
    secret,
    async (error: VerifyErrors | null, payload?: JwtPayload | string) => {
      if (error) {
        response.status(401).send({ message: "Invalid JWT Token", error });
      } else if (payload && typeof payload !== "string") {
        request.headers.user_id = payload.user_id;
        request.headers.username = payload.username;
        request.headers.role = payload.role;
        next();
      }
    }
  );
};

export default authenticateJwtToken;
