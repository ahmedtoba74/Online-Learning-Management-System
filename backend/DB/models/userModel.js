import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "User must have a name"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "User must have an email"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email"],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, "User must have a phone number"],
            unique: true,
            validate: [
                validator.isMobilePhone,
                "Please provide a valid phone number",
            ],
            trim: true,
        },
        role: {
            type: String,
            required: [true, "User must have a role"],
            enum: ["student", "teacher", "admin"],
        },
        password: {
            type: String,
            required: [true, "User must have a password"],
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, "User must confirm their password"],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "Passwords are not the same!",
            },
            trim: true,
            select: false,
            required: [true, "User must confirm their password"],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
