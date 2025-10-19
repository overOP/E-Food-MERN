import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/database.js";
// importing routes
import authRoute from "./routes/auth/authRoute.js";
import productRoute from "./routes/admin/productRoute.js";
import adminUsersRoute from "./routes/admin/adminUsersRoute.js";
import userReviewRoute from "./routes/user/userReviewRoute.js";
import profileRoute from "./routes/user/profileRoute.js";
import cartRoute from "./routes/user/cartRoute.js";
import orderRoute from "./routes/user/orderRoute.js";
import adminOrderRoute from "./routes/admin/adminOrderRoute.js"
import paymentRoutes from "./routes/user/paymentRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
connectToDatabase(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// telling node.js to give access to uploaded files
app.use(express.static("./uploads"));

app.get("/", (req, res) => {
  res.send(`<h1>🚀 Server is running 🚀</h1>`)});

app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/admin", adminUsersRoute)
app.use("/api/reviews", userReviewRoute)
app.use("/api/profile", profileRoute)
app.use("/api/cart", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/admin/orders", adminOrderRoute)
app.use("/api/payment", paymentRoutes)

//Listen server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
