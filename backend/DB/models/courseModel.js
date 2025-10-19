import mongoose from "mongoose";

export const CourseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Course must have a title"],
        },
        description: {
            type: String,
            required: [true, "Course must have a description"],
        },
        price: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        matrials: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Material",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Course = mongoose.model("Course", CourseSchema);

export default Course;
