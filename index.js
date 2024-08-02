import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import forgetpassroute from './routes/forgetpassroute.js'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mailRoutes from "./routes/mailRoutes.js"
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3050;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// Middleware for CORS and JSON parsing
const allowedOrigins = [

  "http://localhost:5173",
  "https://sm-tours-frontend.vercel.app"
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tour", tourRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/booking", bookingRoutes);
app.use('/api',forgetpassroute)
app.use('/api',mailRoutes)
app.use("/api",blogRoutes)

app.get("/", (req, res) => {
  res.send("Welcome to the Sk tour and travels");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
