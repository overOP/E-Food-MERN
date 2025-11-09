import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import bcrypt from "bcrypt";
import cors from "cors";
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
import User from "./model/userModel.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
connectToDatabase(process.env.MONGO_URI);


app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers 
    }
));
// initializing express app
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// telling node.js to give access to uploaded files
app.use(express.static("./uploads"));

app.get("/chat", (req, res) => {
  res.render("home.ejs");
});
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

//Listen server also websocket connection
const server =  app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

//emit is used to send data from server to client
//on is used to receive data from client to server
//to is used to send data to a specific client
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  socket.on("registerUser",async (data) => {
    const { Name, Email, Number, Password } = data;
    await User.create({
      userName: Name,
      userEmail: Email,
      userPhoneNumber: Number,
      userPassword: bcrypt.hashSync(Password, 10),
    });
    console.log("User registered:",data);
    socket.emit("response", { message: "User registered successfully" });
    io.to(socket.id).emit("response", { message: "User registered successfully" });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
})

// exporting io to use in other files
// const getScoketIo = () => {
//   return io;
// }

// export default getScoketIo;

// in websocket we have
// http = ws
// https = wss