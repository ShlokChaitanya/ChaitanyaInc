import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from './FireBase';
import generateToken from './Function';

const ContactUs = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [messageErrorMessage, setMessageErrorMessage] = useState('');

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (!nameErrorMessage && !emailErrorMessage && !messageErrorMessage && name && email && message) {
            const contactId = generateToken();
            const contactRef = doc(db, "contactUs", contactId);
            const contactData = {
                email: email, username: name, message: message,
                contactId: contactId,
                createdAt: new Date().toISOString(),
            };
            setDoc(contactRef, contactData)
                .then(() => {
                    alert('Form submitted successfully.');
                    setName(''); setEmail(''); setMessage('');
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);
                }
            );
        } else {
            alert('Please fill the form correctly.');
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
        <section className="text-gray-400 bg-gray-900 body-font relative">
            <div className="container px-5 py-2 pb-10">
                <h1 className="text-5xl font-medium title-font text-white mb-3 text-center">Contact US</h1>
                <div class="flex justify-center mb-9">
                    <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                </div>
                <div className="mx-auto flex sm:flex-nowrap flex-wrap">
                    <div className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                        <iframe
                            width="100%"
                            height="100%"
                            title="map"
                            className="absolute inset-0"
                            frameBorder="0"
                            marginHeight="0"
                            marginWidth="0"
                            scrolling="no"
                            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                            style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.16)' }}
                        ></iframe>
                        <div className="bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md">
                            <div className="lg:w-1/2 px-6">
                                <h2 className="title-font font-semibold text-white tracking-widest text-xs">ADDRESS</h2>
                                <p className="mt-1">Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter</p>
                            </div>
                            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                <h2 className="title-font font-semibold text-white tracking-widest text-xs">EMAIL</h2>
                                <a href="mailto:example@email.com" className="text-indigo-400 leading-relaxed">
                                    example@email.com
                                </a>
                                <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">PHONE</h2>
                                <p className="leading-relaxed">123-456-7890</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full mt-8 md:mt-0">
                        <h2 className="text-white text-3xl mb-1 font-medium title-font">Contact Us</h2>
                        <p className="leading-relaxed mb-5">Your thoughts and suggestions make us better every day.</p>
                        <div className="relative mb-4">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-400">
                                Full Name
                            </label>
                            <input
                                type="text" value={name} onChange={nameHandler} required
                                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            {nameErrorMessage && <div class="error"><a>{nameErrorMessage}</a></div>}
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-400">
                                Email
                            </label>
                            <input
                                type="email" value={email} onChange={emailHandler} required
                                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            {emailErrorMessage && <div class="error"><i class="fa-solid fa-triangle-exclamation"></i><a>{emailErrorMessage}</a></div>}
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="message" className="leading-7 text-sm text-gray-400">
                                Message
                            </label>
                            <textarea
                                id="message" value={message} onChange={messageHandler} required
                                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                            ></textarea>
                            {messageErrorMessage && <div class="error"><i class="fa-solid fa-triangle-exclamation"></i><a>{messageErrorMessage}</a></div>}
                        </div>
                        <button onClick={formSubmitHandler} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                            Button
                        </button>
                        <p className="text-xs text-gray-400 text-opacity-90 mt-3">
                            By submitting this form, you agree to our <Link to="/Privacy-Policy" className="text-indigo-400">Privacy Policy</Link> and <Link to="Terms-of-Use" className="text-indigo-400">Terms of Use</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
