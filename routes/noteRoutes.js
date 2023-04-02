const express = require("express");
const { getNotes, postNote } = require("../controllers/noteController");
const router = express.Router({ mergeParams: true });
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getNotes).post(protect, postNote);

module.exports = router;
