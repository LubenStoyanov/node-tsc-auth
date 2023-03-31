import Express from "express";
import { Types } from "mongoose";
export type Register = {
  email: string;
  username: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export type JWTPayload = {
  id: Types.ObjectId;
  username: string;
  email: string;
};
