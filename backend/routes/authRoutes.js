const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

// Registration route (handles verification via Redis)
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

// Get profile (protected)
router.get("/profile", authMiddleware, authController.getProfile);

// Update profile (protected)
router.put("/profile", authMiddleware, authController.updateProfile);

module.exports = router;
