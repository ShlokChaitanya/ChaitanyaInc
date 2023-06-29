const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

async function addTransactionToDatabase(userId, transactionId, receipt) {
    const transactionData = {
        userID: userId,
        status: "Pending",
        orderId: receipt,
        txnAmount: "9.00",
        txnType: "Test",
        gatewayName: "RazorPay",
        txnDate: new Date().toISOString(),
    };

    try {
        const transactionRef = db.collection("transactionsHistory").doc(transactionId);
        await transactionRef.set(transactionData);

        console.log("Transaction added successfully to the database");
    } catch (error) {
        console.error("Failed to add transaction to the database:", error);
    }
}

module.exports = { addTransactionToDatabase };