const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
