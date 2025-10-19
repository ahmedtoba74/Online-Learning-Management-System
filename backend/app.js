import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dbConnection from "./DB/dbConnection.js";
import userRoutes from "./src/modules/users/user.routes.js";
import authRoutes from "./src/modules/auth/auth.routes.js";

const app = express();
const port = 3000;

dbConnection();

const allowedOrigins = ["http://localhost:5500", "http://127.0.0.1:5500"];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg =
                    "The CORS policy for this site does not allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
