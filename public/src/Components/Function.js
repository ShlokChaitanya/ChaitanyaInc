import Tesseract from 'tesseract.js';
import axios from 'axios';

export async function extractTextFromImage(imageUrl) {
    try {
        const { data } = await Tesseract.recognize(imageUrl);
        const extractedText = data.text;
        return extractedText;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

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

export default generateToken;

export function loadScript(src) {
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

export async function displayRazorpay(userName, email, phoneNumber, userId) {
    const res = await loadScript( "https://checkout.razorpay.com/v1/checkout.js" );
    
    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const result = await axios.post("http://localhost:5000/payment/orders");

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Chaitanya Ic.",
        description: "Test Transaction",
        image: "http://localhost:5000/logo.jpg",
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            const result = await axios.post("http://localhost:5000/payment/success", data);
            alert(result.data.msg);
            // const paymentDocRef = doc(db, 'transactionHistory');
            // const userRef = doc(db, 'User', username);
            // const paymentData = {
            //     transactionId: transactionId,
            //     uploadTimestamp: serverTimestamp(),
            // };
            // await Promise.all([
            //     setDoc(paymentDocRef, paymentData),
            //     setDoc(userRef, { transcationId: transactionId }, { merge: true }),
            // ]);
        },
        prefill: {
            name: userName,
            email: email,
            contact: `${phoneNumber}`,
        },
        notes: {
            address: "Chaitanya Inc.",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}