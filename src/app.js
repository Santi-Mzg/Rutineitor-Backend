import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import workoutRoutes from './routes/workout.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();
const allowedOrigins = ["http://localhost:5173", "https://santi-mzg.github.io"];


app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true); // Permitir el origen
            } else {
                callback(new Error("No autorizado por CORS")); // Rechazar otros orígenes
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
})
);
app.options("*", cors()); // Manejar preflight para cualquier ruta
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", workoutRoutes);
app.use("/api", userRoutes);
app.get("/api/ping", (req, res) => {
    res.status(200).send("pong");
});

export default app;