import React from 'react'
import image from '../page-not-found.svg'

function NotFound() {
    return (<>
        <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto flex flex-col px-5 justify-center items-center">
                <img className="lg:w-2/6  w-4/6 object-cover object-center rounded" alt="hero" src={image} />
                <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
                    <h1 className="title-font sm:text-5xl text-3xl font-medium text-gray-400">404</h1>
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-400">Looks like the page you were looking for is no longer here.</h1>
                    <p className="mb-8 leading-relaxed sm:text-lg">We're sorry, the page you were looking for isn't found here. link you followed may either be broken or no longer exists. Pleasetry again, or take a look at our.</p>
                </div>
            </div>
        </section>
    </>
    )
}

export default NotFound