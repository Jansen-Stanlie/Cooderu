const express = require("express");
const user = require("./user.router");
const router = express.Router();
const todo = require("./todo.router");

router.use("/todo", todo);
router.use("/user", user);
module.exports = router;
