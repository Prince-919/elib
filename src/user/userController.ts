import { NextFunction, Response, Request } from "express";
import createHttpError from "http-errors";
import User from "./userModel";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  const user = await User.findOne();
  if (user) {
    const error = createHttpError(400, "User already exists with this email");
    return next(error);
  }

  res.json({ message: "User created" });
};
