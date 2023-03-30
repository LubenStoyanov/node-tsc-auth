import express from "express";
import { connectToDatabase } from "./db.js";
import User from "./models/User.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;
connectToDatabase();
app.get("/", (req, res) => {
    return req.json({ message: "Hello World" });
});
app.post("/api/v1/register", async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.exists({ email: email });
    if (user) {
        return res.send("User already exists").status(400);
    }
    else {
        const newUser = await User.create({
            username,
            email,
            password,
        });
        newUser.save();
        return res.status(201).json({ message: "User created" });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map