import bcrypt from "bcrypt";
import { Register, Login, TypedRequestBody } from "../utils/types.js";
import { Response } from "express";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

const saltRounds = 10;

export const register = async (
  req: TypedRequestBody<Register>,
  res: Response
) => {
  const { username, email, password } = req.body;
  const user = await User.exists({ email: email });
  console.log(user);

  if (user) {
    return res.status(400).send("User already exists");
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
  if (!user) {
    return res.status(400).send("User not found");
  } else {
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(400).send("Incorrect password");
    } else {
      const token = generateToken({
        id: user._id,
        username: user.username,
        email: user.email,
      });

      console.log(token);
      return res
        .status(200)
        .json({ message: "Login successful", token: token });
    }
  }
};
