const express = require("express");
const router = express.Router();

const {
	create,
	findAll,
	deleteUser,
	updateUser,
} = require("../controllers/user.controller");

router.post("/", create);
router.get("/", findAll);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
module.exports = router;
