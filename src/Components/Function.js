import axios from 'axios';

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
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
    }

    const path = window.location.origin;
    const result = await axios.post(path + '/payment/orders');

    if (!result || !result.data || !result.data.amount || !result.data.id || !result.data.currency) {
        alert('Invalid server response. Are you online?');
        return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: 'rzp_test_eHkH3Gvo3PpSJ8',
        amount: amount.toString(),
        currency: currency,
        name: 'Chaitanya Ic.',
        description: 'Test Transaction',
        image: 'https://raw.githubusercontent.com/ShlokChaitanya/ChaitanyaInc/main/logo.jpg',
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            const result = await axios.post(path + '/payment/success', data);

            alert(result.data.msg);
            // Additional code for handling payment success and updating database
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
            address: 'Chaitanya Inc.',
        },
        theme: {
            color: '#61dafb',
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}
