const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { accessChat } = require("../controllers/chatControllers");

const router = express.Router();

router.route("/").post(protect, accessChat);
// router.route("/").get(protect, fetchChats);
// router.route("/group").post(protect, createGroup);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupdelete").delete(protect, deleteGroup);
// router.route("/groupadd").put(protect, addMember);

module.exports = router;
