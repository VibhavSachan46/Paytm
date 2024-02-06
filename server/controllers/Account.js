const User = require("../models/User");
const Account = require("../models/Account");
const { default: mongoose } = require("mongoose");

exports.balance = async (req, res) => {

    try {
        console.log("Balance process started")
        const account = await Account.findOne({
            userId: req.user.id
        })
        console.log("Balance process ended")
        res.json({
            balance: account.balance
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Could'nt fetch balance"
        })
    }
}

exports.transaction = async (req, res) => {

    try {
        console.log("Transaction started")
        const session = await mongoose.startSession()

        session.startTransaction();
        const { amount, to } = req.body;

        //fetch account details
        const account = await Account.findOne({ userId: req.user.id }).session(session)

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.user.id }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message: "transaction failed"
        });
    }
}