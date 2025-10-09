import User from "../../../DB/models/userModel.js";
import catchAsync from "../../utils/catchasync.js";
import AppError from "../../utils/appError.js";

export const createUser = catchAsync(async (req, res, next) => {
    const { name, email, phone, role, password, passwordConfirm } = req.body;
    if (!name || !email || !phone || !role || !password || !passwordConfirm) {
        return next(new AppError("Please provide all required fields", 400));
    }

    if (password !== passwordConfirm) {
        return next(new AppError("Passwords do not match", 400));
    }

    const user = await User.create({
        name,
        email,
        phone,
        role,
        password,
        passwordConfirm,
    });

    user.password = undefined;
    user.passwordConfirm = undefined;

    res.status(201).json({
        status: "success",
        data: {
            user,
        },
    });
});

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            results: users.length,
            data: {
                users,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new AppError("User not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
};

export const updateUser = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        return next(new AppError("User not found", 404));
    }
};

export const deleteUser = async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: "success",
        data: null,
    });
};
