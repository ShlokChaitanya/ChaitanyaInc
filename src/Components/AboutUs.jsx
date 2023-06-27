import React from 'react';

const AboutUs = () => {
    return (
        <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-8 py-24 mx-auto flex flex-wrap">
                <div className="flex flex-wrap px-2 -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
                    <div className="w-full sm:p-4 px-4 mb-6">
                        <h1 className="title-font font-medium text-4xl mb-2 text-white">Who we Are?</h1>
                        <div className="leading-relaxed text-l">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero aut perspiciatis voluptas non harum cumque velit odit ex minus quaerat optio consectetur voluptatem dolor et deserunt fugit sunt, iste aliquid, in architecto, consequatur tempora! Soluta veritatis architecto nesciunt voluptatibus voluptatem iste eaque repellendus placeat nisi, vel quidem alias eligendi, pariatur rem. Explicabo, eaque. Numquam consectetur explicabo porro reprehenderit quidem? Voluptatibus quidem eos ratione!</div>
                    </div>
                </div>
                <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
                    <img className="object-cover object-center w-full h-full" src="https://dummyimage.com/600x300" alt="stats" />
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
