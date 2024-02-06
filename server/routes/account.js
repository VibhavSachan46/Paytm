const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/Auth")
const { balance, transaction } = require("../controllers/Account")

router.get("/balance", balance)
router.post("/transaction", transaction)

module.exports = router;