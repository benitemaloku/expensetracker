require("dotenv").config();
const express = require("express");
const cors = require("cors");   // ← VETËM NJË HERË
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

connectDB();

// ✅ CORS (korrekt)
app.use(cors({
  origin: "https://www.bmxdev.site",
  credentials: true
}));

app.use(express.json());
