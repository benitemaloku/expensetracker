const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getUserInfo,
  updateUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// ----------------- AUTH ROUTES -----------------
router.post("/register", registerUser);               // Register new user
router.post("/login", loginUser);                     // Login user
router.get("/getUser", protect, getUserInfo);        // Get logged-in user info
router.put("/updateUser", protect, upload.single("profileImage"), updateUser); // Update user

// ----------------- PASSWORD RESET -----------------
router.post("/forgotPassword", forgotPassword);      // Send reset link
router.put("/reset/:token", resetPassword);          // Reset password using token

// ----------------- IMAGE UPLOAD -----------------
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
