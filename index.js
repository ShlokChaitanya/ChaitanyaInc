const functions = require("firebase-functions");
const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ extended: false }));
app.use("/payment", require("./routes/payment"));
app.get('/api', (req, res) => res.send("API Running"));
app.get('/', (req, res) => res.send("API Running"));
// app.use(cors({
//     origin: 'http://localhost:3000',
// }));


app.listen(port, () => console.log(`server started on port ${port}`));
exports.app = functions.https.onRequest(app);