import express from "express";
import cors from "cors";
import { loggerMiddleware } from "./middleware/logger.js";
import authRouter from "./routes/auth.js";
import { connectToDatabase } from "./database/db.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "https://127.0.0.1:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

app.use("/api/v1", loggerMiddleware, authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
