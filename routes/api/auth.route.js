const express = require("express");
const router = express.Router();
const authController = require("../../controllers/api/auth.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

// @route POST api/v1/auth
// @desc Register new user
// @access Public
router.post("/register", authController.register);

// @route POST api/v1/auth
// @desc Authenticate the user
// @access Public
router.post("/login", authController.login);

// @route GET api/v1/auth/user
// @desc Get user data
// @access Private
router.get("/user", authMiddleware, authController.getUserData);

module.exports = router;
