import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <header className="text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <img
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600"
                        alt="Error"
                        width="35"
                        height="35"
                    />
                    <span className="ml-3 text-xl">Chaitanya Inc.</span>
                </a>
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
                    <Link to="/" className="mr-5 hover:text-white">Home</Link>
                    <Link to="/AboutUs" className="mr-5 hover:text-white">About Us</Link>
                    <Link to="/ContactUs" className="mr-5 hover:text-white">Contact Us</Link>
                </nav>
                <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
                    Button
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-1"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default NavBar