import Express from "express";
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
