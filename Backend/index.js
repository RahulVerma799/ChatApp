const express = require("express");
const { server, app } = require("./socket/socket");
const cors = require("cors"); // Add cors
require("dotenv").config();

const PORT = process.env.PORT || 4000;

require("./config/database").connectDb();

// Configure CORS
const corsOptions = {
    origin: "https://chatappfrontend-8b2n.onrender.com", // Frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow credentials like cookies
};

app.use(cors(corsOptions)); // Apply CORS configuration

// Add other middlewares
app.use(express.json());
const cookieparser = require("cookie-parser");
app.use(cookieparser());

// Test Route
app.get("/", (req, res) => {
    res.send("hello world");
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Routes
const auth = require("./routes/auth");
app.use("/api", auth);

const messageRouter = require("./routes/messageRoute");
app.use("/api", messageRouter);

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
