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

// AUTH ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

// UPDATE USER (me foto)
router.put(
  "/updateUser",
  protect,
  upload.single("profileImage"),
  updateUser
);

// PASSWORD RESET
router.post("/forgotPassword", forgotPassword);
router.put("/reset/:token", resetPassword);

// OPTIONAL: Upload vetëm foto
router.post(
  "/upload-image",
  protect,
  upload.single("profileImage"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  }
);

module.exports = router;
