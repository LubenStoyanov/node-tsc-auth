import bcrypt from "bcrypt";
import { Register, Login, TypedRequestBody } from "../types.js";
import { Response } from "express";
import User from "../models/User.js";

const saltRounds = 10;

export const register = async (
  req: TypedRequestBody<Register>,
  res: Response
) => {
  console.log("register");
  const { username, email, password } = req.body;
  const user = await User.exists({ email: email });
  console.log(user);

  if (user) {
    return res.send("User already exists").status(400);
  } else {
    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username: username,
      email: email,
      password: hash,
    });
    newUser.save();

    return res.status(201).json({ message: "User created" });
  }
};

export const login = async (req: TypedRequestBody<Login>, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }, "password");
  const verifiedUser = await bcrypt.compare(password, user.password);
};
