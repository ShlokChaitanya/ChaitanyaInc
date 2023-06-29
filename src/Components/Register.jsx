import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from './FireBase';
import generateToken, { displayRazorpay } from './Function';
import { useHistory } from 'react-router-dom';


function Register() {
    const [name, setName] = useState();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [messageErrorMessage, setMessageErrorMessage] = useState('');
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');
    const history = useHistory();

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (!phoneNumberErrorMessage && !emailErrorMessage && !messageErrorMessage && !nameErrorMessage && phoneNumber && email && message && name) {
            const UserId = generateToken(12);
            const contactRef = doc(db, "User", UserId);
            const contactData = {
                email: email, username: name, message: message,
                phoneNumber: phoneNumber, userId: UserId, 
                transcationId: '',
                createdAt: new Date().toISOString(),
            };
            setDoc(contactRef, contactData)
                .then(() => {
                    alert("Welcome aboard! Get ready to embark on an incredible journey with us.");
                    setPhoneNumber(''); setEmail(''); setMessage('');
                    displayRazorpay(name, email, phoneNumber, UserId);
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);
                }
                );
        } else {
            alert('Please fill the form correctly.');
        }
    };

    const emailHandler = (event) => {
        const trimmedEmail = event.target.value.trim();
        setEmail(trimmedEmail);
        if (!trimmedEmail || trimmedEmail === '') {
            setEmailErrorMessage('Please enter an email.');
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(trimmedEmail)) {
                setEmailErrorMessage('Invalid email address.');
            } else {
                setEmail(trimmedEmail);
                setEmailErrorMessage('');
            }
        }
    };

    const phoneNumberHandler = (event) => {
        const enteredPhoneNumber = event.target.value.trim();
        setPhoneNumber(parseInt(enteredPhoneNumber));
        if (enteredPhoneNumber === '') {
            setPhoneNumberErrorMessage('Please enter a phone number.');
        } else {
            const phoneNumberPattern = /^\d{10}$/;
            if (!phoneNumberPattern.test(enteredPhoneNumber)) {
                setPhoneNumber(parseInt(enteredPhoneNumber));
                setPhoneNumberErrorMessage('Invalid phone number.');
            } else {
                setPhoneNumber(parseInt(enteredPhoneNumber));
                setPhoneNumberErrorMessage('');
            }
        }
    };

    const nameHandler = (event) => {
        const trimmedName = event.target.value;
        setName(trimmedName);
        if (!trimmedName || trimmedName === '') {
            setNameErrorMessage('Please enter your name.');
        } else {
            if (trimmedName.length < 3) {
                setNameErrorMessage('Name must be at least 3 characters long.');
            } else {
                setName(trimmedName);
                setNameErrorMessage('');
            }
        }
    };


    const messageHandler = (event) => {
        const trimmedMessage = event.target.value;
        setMessage(trimmedMessage);
        if (!trimmedMessage || trimmedMessage === '') {
            setMessageErrorMessage('Please enter a message.');
        } else {
            if (trimmedMessage.length < 10) {
                setMessageErrorMessage('Message must be at least 10 characters long.');
            } else if (trimmedMessage.length > 200) {
                setMessageErrorMessage('Message cannot be more than 200 characters long.');
            } else {
                setMessage(trimmedMessage);
                setMessageErrorMessage('');
            }
        }
    };

    return (
        <section id="contact" className="text-gray-600 body-font bg-gray-900 relative">
            <div className="container px-3 py-2 mx-auto flex justify-center">
                <div className="bg-opacity-5 lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10 shadow-2xl text-center">
                    <h2 className="text-white text-4xl mb-1 font-bold title-font">Register Now</h2>
                    <p className="leading-relaxed mb-1 text-gray-300">Unlock exclusive benefits by signing up today</p>
                    <div className="relative mb-4 text-left">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-300">
                            Full Name
                        </label>
                        <input
                            type="text" value={name} onChange={nameHandler} required
                            className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        {nameErrorMessage && <div class="error"><a>{nameErrorMessage}</a></div>}
                    </div>
                    <div className="relative mb-4 text-left">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-300">
                            Email
                        </label>
                        <input
                            type="email" value={email} onChange={emailHandler} required
                            className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        { emailErrorMessage && <div class="error"><a>{emailErrorMessage}</a></div> }
                    </div>
                    <div className="relative mb-4 text-left">
                        <label htmlFor="Phone" className="leading-7 text-sm text-gray-300">
                            Contact No
                        </label>
                        <input 
                            type="tel" value={phoneNumber} onChange={phoneNumberHandler} required
                            className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        { phoneNumberErrorMessage && <div class="error"><a>{phoneNumberErrorMessage}</a></div> }
                    </div>
                    <div className="relative mb-4 text-left">
                        <label htmlFor="message" className="leading-7 text-sm text-gray-300">
                            Message
                        </label>
                        <textarea
                            id="message" value={message} onChange={messageHandler} required
                            className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        ></textarea>
                        {messageErrorMessage && <div class="error"><i class="fa-solid fa-triangle-exclamation"></i><a>{messageErrorMessage}</a></div>}
                    </div>
                    <button onClick={formSubmitHandler} className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
                        Thanks for Membership
                    </button>
                </div>
            </div>
            <br />
        </section>
    )
}

export default Register