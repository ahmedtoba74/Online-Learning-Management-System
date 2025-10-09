import jwt from "jsonwebtoken";

import User from "../../../DB/models/userModel.js";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchasync.js";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // derive cookie expiration from JWT_EXPIRES_IN (e.g. "7d") or default to 7 days
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";
    const days = parseInt((jwtExpiresIn.match(/\d+/) || [7])[0], 10) || 7;

    const cookieOptions = {
        expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
    };

    res.cookie("jwt", token, cookieOptions);

    // remove password from output
    if (user.password) user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        data: {
            user,
        },
    });
};

export const login = catchAsync(async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return next(new AppError("Please provide email and password", 400));
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    const token = signToken(user._id);

    createSendToken(user, 200, res);
});
