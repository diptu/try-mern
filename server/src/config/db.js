// connectDB.js
const mongoose = require('mongoose');
const { ATLAS_URI } = require('../secret');

// Validate Mongo URI
if (!ATLAS_URI) {
    throw new Error("❌ Missing ATLAS_URI in environment variables");
}

const connectDB = async (options = {}) => {
    const defaultOptions = {
        autoIndex: false,                 // Recommended for production
        maxPoolSize: 10,                   // Connection pool
        serverSelectionTimeoutMS: 5000,    // Fail fast on wrong URI
        socketTimeoutMS: 45000,            // Timeout idle sockets
        ...options
    };

    try {
        await mongoose.connect(ATLAS_URI, defaultOptions);
        console.log("✅ MongoDB Connected");

        // Events
        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB Error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("⚠️ MongoDB Disconnected");
        });

        // Graceful shutdown
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("🔌 MongoDB connection closed on app termination");
            process.exit(0);
        });

    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);

        // Optional: Retry connection
        setTimeout(() => {
            console.log("🔄 Retrying MongoDB connection...");
            connectDB(options);
        }, 5000);
    }
};

module.exports = connectDB;
