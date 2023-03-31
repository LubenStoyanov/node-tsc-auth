import epxress from "express";
import { register } from "../controller/auth.js";

export default epxress.Router().post("/register", register);
