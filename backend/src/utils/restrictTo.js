import AppError from "../../utils/appError.js";

const restrictTo =
    (...roles) =>
    (req, res, next) => {
        // roles is an array e.g. ['admin', 'lead-guide']
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    "You do not have permission to perform this action",
                    403
                )
            );
        }
        next();
    };

export default restrictTo;
