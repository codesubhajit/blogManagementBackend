import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js"; 
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";

dotenv.config();

const app = express();


app.use(cors({
    origin: "https://blog-management-frontend-psi.vercel.app/",
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);


const startServer = async () => {
    try {
        await connectDB(); 
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
};

startServer();
