import { NextFunction, Response, Request } from "express";
import createHttpError from "http-errors";
import User from "./userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { User as UserType } from "./userTypes";

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

  try {
    const user = await User.findOne();
    if (user) {
      const error = createHttpError(400, "User already exists with this email");
      return next(error);
    }
  } catch (err) {
    return next(createHttpError(500, "Error while getting user"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser: UserType;
  try {
    newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return next(createHttpError(500, "Error while creating user"));
  }

  try {
    const token = jwt.sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    res.json({ accessToken: token });
  } catch (err) {
    return next(createHttpError(500, "Error while signing the jwt token"));
  }
};
