import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use(express.static("uploads"));

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(" Database connected successfully!");

        app.listen(9080, () => {
            console.log(" Server is running on port 9080");
        });
    } catch (error) {
        console.error(" Database connection failed:", error.message);
        process.exit(1);
    }
};

start();
