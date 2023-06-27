import React from 'react'
import './User.css'
import { useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { extractTextFromImage } from './Function';
import generateToken from './Function';
import { storage, db } from './FireBase';
import { v4 } from 'uuid';

function User(props) {
    const { username } = props.match.params;
    const [paymentImage, setPaymentImage] = useState(null);

    const handleFileChange = (event) => {
        const paymentImage = event.target.files[0];
        const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (paymentImage && acceptedImageTypes.includes(paymentImage.type)) {
            setPaymentImage(paymentImage.name);
        } else {
            setPaymentImage(null);
        }
    };


    const uploadHeader = async () => {
        if (!paymentImage) {
            return 
        }
        try {
            const transactionId = generateToken(12);
            console.log('Transaction ID:', transactionId);
            console.log(paymentImage.type);
            const storageRef = ref(storage, `payment-screenshots/${paymentImage.name}`);
            const metadata = { cacheControl: 'public, max-age=300', contentType: 'image/jpeg' };
            await uploadBytes(storageRef, paymentImage, metadata);
            console.log('Uploaded a blob or file!');

            const downloadURL = await getDownloadURL(storageRef);
            const extractedText = await extractTextFromImage(downloadURL);
            const isTransactionWithinHour = checkTransactionWithinHour(extractedText);

            if (isTransactionWithinHour) {
                console.log('Transaction took place within the last hour.');

                const paymentDocRef = doc(db, 'payments');
                const userRef = doc(db, 'User', username);

                const paymentData = {
                    imageUrl: downloadURL,
                    transactionId: transactionId,
                    uploadTimestamp: serverTimestamp(),
                };

                await Promise.all([
                    setDoc(paymentDocRef, paymentData),
                    setDoc(userRef, { transcationId: transactionId }, { merge: true }),
                ]);

                console.log('Payment details saved to Firestore.');
            } else {
                console.log('Transaction took place more than an hour ago.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const checkTransactionWithinHour = (transactionDetails) => {
        const currentTime = new Date();
        const oneHourAgo = new Date(currentTime.getTime() - 3600000);
        const transactionTimestamp = extractTransactionDetailsFromResponse(transactionDetails);
        return transactionTimestamp >= oneHourAgo && transactionTimestamp <= currentTime;
    };

    const extractTransactionDetailsFromResponse = (imageRecognitionResult) => {
        const lines = imageRecognitionResult.regions.flatMap((region) =>
            region.lines.flatMap((line) => line.words.map((word) => word.text))
        );
        console.log(lines);
        const transactionDetails = lines.join(' ');
        console.log(transactionDetails);
        return transactionDetails;
    };


    const uploadFooter = () => {
        return (
            <>
                <label htmlFor="file" className="footer">
                    <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
                            <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
                        </g>
                    </svg>
                    <p>{paymentImage ? paymentImage : 'Not selected file'}</p>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" strokeWidth="2"></path>
                            <path d="M19.5 5H4.5" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path>
                            <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" strokeWidth="2"></path>
                        </g>
                    </svg>
                </label>
            </>
        );
    };

    return (
        <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap space-x-14 justify-center">
                <div className="flex flex-wrap px-4 -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
                    <div className="w-full sm:p-4 px-4 mb-6">
                        <h1 className="title-font font-medium text-4xl mb-2 text-white">Secure Payment Verification</h1>
                        <div className="leading-relaxed text-lg">Upload the screenshot of your payment to enhance the security of our services. We collect this information to verify and safeguard your transactions.</div>
                    </div>
                </div>
                <div className="card-container">
                    <div className="header">
                        {paymentImage ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="-140 -81 768 768"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg>)
                            : (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </g>
                            </svg>)}
                        {paymentImage ? <><p>{paymentImage}</p><label htmlFor="file">Not this ?</label></> : <p>Not Selected file</p>}
                    </div>
                    <input id="file" type="file" accept="image/*" onChange={handleFileChange} />
                    {!paymentImage ? uploadFooter() : <button onClick={uploadHeader} className="upload-btn">Upload File</button>}
                </div>
            </div>
        </section>
    );
}

export default User