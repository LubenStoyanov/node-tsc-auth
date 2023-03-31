import express from "express";
import { loggerMiddleware } from "./middleware/logger.js";
import authRouter from "./routes/auth.js";
import { connectToDatabase } from "./database/db.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

app.use("/api/v1", loggerMiddleware, authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
