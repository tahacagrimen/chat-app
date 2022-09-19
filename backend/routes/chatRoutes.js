const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroup,
  renameGroup,
  addMember,
  deletefromGroup,
} = require("../controllers/chatControllers");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroup);
router.route("/rename").put(protect, renameGroup);
router.route("/groupadd").put(protect, addMember);
router.route("/groupdelete").put(protect, deletefromGroup);

module.exports = router;
