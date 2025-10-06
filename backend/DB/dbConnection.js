import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        // For development, you can use a local MongoDB connection
        // Replace this with your actual MongoDB connection string
        const DB_URI = process.env.DATABASE_URI.replace(
            "<db_password>",
            process.env.DATABASE_PASSWORD
        );

        await mongoose.connect(DB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        // Don't exit the process, just log the error
        console.log("Server will continue without database connection");
    }
};

export default dbConnection;
