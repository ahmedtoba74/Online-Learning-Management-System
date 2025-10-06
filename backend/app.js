import dotenv, { config } from "dotenv";
dotenv.config();

import express from "express";
import dbConnection from "./DB/dbConnection.js";

const app = express();
const port = 3000;

dbConnection();

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
