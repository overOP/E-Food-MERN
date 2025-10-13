import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/database.js";
import authRoute from "./routes/auth/authRoute.js";
import productRoute from "./routes/admin/productRoute.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
connectToDatabase(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// telling node.js to give access to uploaded files
app.use(express.static("./uploads"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

app.use("/api", authRoute)
app.use("/api", productRoute)

//Listen server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
