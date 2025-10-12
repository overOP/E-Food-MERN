import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/database.js";
import authRoute from "./routes/auth/authRoute.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
connectToDatabase(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

app.use("/auth", authRoute)

//Listen server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
