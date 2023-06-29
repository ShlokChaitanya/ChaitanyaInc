const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();
const { addTransactionToDatabase } = require("./Firebase.js");

function generateToken(TokenLength) {
    const alphanumericCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const TokenIdLength = TokenLength || 10;
    let TokenId = '';

    for (let i = 0; i < TokenIdLength; i++) {
        const randomIndex = Math.floor(Math.random() * alphanumericCharacters.length);
        TokenId += alphanumericCharacters[randomIndex];
    }

    return TokenId;
}

router.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });
        const receipt = `receipt_order_${generateToken(5)}`;
        const { userId, transactionId } = req.body;
        const options = {
            amount: 900, // amount in smallest currency unit
            currency: 'INR',
            receipt: receipt,
        };
        const order = await instance.orders.create(options);
        if (!order) {
            return res.status(500).send("Some error occurred");
        }
        await addTransactionToDatabase(userId, transactionId, receipt);
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/success", async (req, res, next) => {
    try {
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest("hex");

        if (digest !== razorpaySignature) {
            return res.status(400).json({ msg: 'Transaction not legit!' });
        }

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});

module.exports = router;