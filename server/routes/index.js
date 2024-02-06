const express = require('express');
const userRouter = require("./user");
const accountRouter = require("./account");
const { auth } = require("../middlewares/Auth")
const router = express.Router();

router.use("/user", userRouter);
router.use("/account", auth, accountRouter)


router.get("/test", auth, (req, res) => {
    const token = req.cookies.token; // Access the token from cookies
    console.log("Token:", token);
    res.json({
        success: true,
        message: "TEST successfull"
    })
})

module.exports = router;