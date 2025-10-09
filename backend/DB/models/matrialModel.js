import mongoose from "mongoose";

const matrialSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Material must have a title"],
        },
        description: {
            type: String,
            required: [true, "Material must have a description"],
        },
        url: {
            type: String,
            required: [true, "Material must have a url"],
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Material = mongoose.model("Material", matrialSchema);

export default Material;
