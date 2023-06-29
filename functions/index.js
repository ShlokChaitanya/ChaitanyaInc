const functions = require("firebase-functions");
const express = require("express");
const cors = require('cors')({ origin: true });
const app = express();

app.use(cors);
app.use(express.json({ extended: false }));
app.use("/payment", require("./routes/payment.js"));

app.get('/api', (req, res) => {
    return res.status(200).send("API Running");
});

exports.app = functions.https.onRequest(app);