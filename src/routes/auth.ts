import epxress from "express";
import { register, login, logout } from "../controller/authentication.js";

export default epxress
  .Router()
  .post("/register", register)
  .post("/login", login)
  .get("/logout", logout);
