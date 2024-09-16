import { NextFunction, Response, Request } from "express";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "User created" });
};
