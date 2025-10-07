import express from "express";

import * as userController from "./user.controller.js";

const router = express.Router();

router
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser);

export default router;
