import Course from "../../../DB/models/courseModel";
import catchAsync from "../../utils/catchasync";
import AppError from "../../utils/appError";

export const createCourse = catchAsync(async (req, res, next) => {
    const { title, description, price, duration, instructor } = req.body;
    if (!title || !description || !price || !duration || !instructor) {
        return next(new AppError("Please provide all required fields", 400));
    }
    const course = await Course.create({
        title,
        description,
        price,
        duration,
        instructor,
    });
    res.status(201).json({
        status: "success",
        data: {
            course,
        },
    });
});

export const getAllCourses = catchAsync(async (req, res, next) => {
    const courses = await Course.find();
    res.status(200).json({
        status: "success",
        results: courses.length,
        data: {
            courses,
        },
    });
});

export const getCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(new AppError("Course not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            course,
        },
    });
});

export const updateCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!course) {
        return next(new AppError("Course not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            course,
        },
    });
});

export const deleteCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
        return next(new AppError("Course not found", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});

export const enrollInCourse = catchAsync(async (req, res, next) => {});

export const getEnrolledCourses = catchAsync(async (req, res, next) => {});

export const getCourseMaterials = catchAsync(async (req, res, next) => {});
