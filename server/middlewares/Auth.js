const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../models/User")

exports.auth = async (req, res, next) => {
    try {
        console.log("middleware started")


        // extract token
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization").replace("Bearer ", "");

        console.log("token is ", token)

        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing',
            })
        }

        // verify the token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            console.log("payload is", payload)
            req.user = payload
        } catch (error) {
            //verification - issue
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
            });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token',
        });
    }
}