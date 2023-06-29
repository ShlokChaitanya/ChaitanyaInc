import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from "./FireBase.js";

export function generateToken(tokenLength) {
    const alphanumericCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenIdLength = tokenLength || 10;
    let tokenId = '';

    for (let i = 0; i < tokenIdLength; i++) {
        const randomIndex = Math.floor(Math.random() * alphanumericCharacters.length);
        tokenId += alphanumericCharacters[randomIndex];
    }

    return tokenId;
}

export default generateToken;

async function success(userId) {
    alert("Thanks for your payment! We'll send you a confirmation email shortly.");
    const paymentDocRef = doc(db, 'transactionHistory', userId);
    const userRef = doc(db, 'User', userId);
    await Promise.all([
        setDoc(paymentDocRef, { status: "completed" }, { merge: true }),
        setDoc(userRef, { paymentStatus: true }, { merge: true }),
    ]);
}

async function failure(userId) {
    alert("Oops! Something went wrong. Please try again.");
    const paymentDocRef = doc(db, 'transactionHistory', userId);
    const userRef = doc(db, 'User', userId);
    await Promise.all([
        setDoc(paymentDocRef, { status: "failed" }, { merge: true }),
        setDoc(userRef, { paymentStatus: false }, { merge: true }),
    ]);
}

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export async function displayRazorpay(userName, email, phoneNumber, userId, transactionId) {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
    }

    const result = await axios.post('/payment/orders', { userId, transactionId });

    if (!result) {
        alert('Invalid server response. Are you online?');
        return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: 'rzp_test_eHkH3Gvo3PpSJ8',
        amount: amount.toString(),
        currency,
        name: 'Chaitanya Inc.',
        description: 'Test Transaction',
        image: 'https://raw.githubusercontent.com/ShlokChaitanya/ChaitanyaInc/main/download.png',
        order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            const result = await axios.post('/payment/success', data);
            result.data.msg === "success" ? success(userId) : failure(userId);
        },
        prefill: {
            name: userName,
            email,
            contact: phoneNumber,
        },
        notes: {
            address: 'Chaitanya Inc.',
        },
        theme: {
            color: '#61dafb',
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}