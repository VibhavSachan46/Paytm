const bcrypt = require("bcrypt");
const User = require("../models/User");
const Account = require("../models/Account")
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup route handler

exports.signup = async (req, res) => {
    try {
        //get data
        const { email, password, firstName, lastName } = req.body

        //check if user already exist s or not
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already Exists',
            });
        }

        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10)
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing Password',
            });
        }

        // create entry for user
        const user = await User.create({
            email,
            firstName,
            lastName,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        console.log("User created")
        const userId = user._id;
        console.log("userid is", userId)
        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })

        return res.status(200).json({
            success: true,
            message: 'User Created Successfully',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered, please try again later',
        });
    }
}

exports.signin = async (req, res) => {
    try {
        //data fetch
        const { email, password } = req.body

        // validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Credentials missing"
            })
        }

        //check for registered user
        let user = await User.findOne({ email });
        //if not a registered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered',
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
        }

        // verify password & generate a Token
        if (await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                })
            user = user.toObject()
            user.token = token
            user.password = undefined

            res.cookie("token", token).status(200).json({
                success: true,
                token,
                user,
                message: 'User Logged in successfully',
            });

        } else {
            //passwsord do not match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect",
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login Failure',
        });
    }
}


exports.bulk = async (req, res) => {
    try {
        const filter = req.query.filter || "";

        // Extract user ID from the request object
        const currentUserID = req.user.id;
        console.log("current user id is", currentUserID)

        const users = await User.find({
            $and: [
                {
                    $or: [
                        { firstName: { "$regex": filter } },
                        { lastName: { "$regex": filter } }
                    ]
                },
                { _id: { $ne: currentUserID } } // Exclude the currently logged-in user
            ]
        });

        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id,
                image: user.image,
            }))
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
        });
    }
};

