const express = require("express");
const router = express.Router();

// const User = require("../models/User")
const { auth } = require("../middlewares/Auth")

const { signup, signin, bulk } = require("../controllers/Auth")

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/bulk", auth, bulk)

router.put("/", auth, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

module.exports = router;