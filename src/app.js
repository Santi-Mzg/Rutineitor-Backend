import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import workoutRoutes from './routes/workout.routes.js';

const app = express();

app.use(
    cors({
        // origin: "http://localhost:5173",
        origin: "https://santi-mzg.github.io",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
})
);

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", workoutRoutes);

export default app;