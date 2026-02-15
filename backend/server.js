require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Në rast që jeni prapa proxy (Render, Heroku, etj)
app.set("trust proxy", 1);

// Lidhja me MongoDB
connectDB();

// Middleware për JSON
app.use(express.json());

// CORS për frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL, // URL e frontend-it
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // nevojitet për cookies
  })
);

// Folder për static files (p.sh. uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route bazë
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes API
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Port
const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
