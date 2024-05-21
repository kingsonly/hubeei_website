import React from "react";

export default function Footer() {
    const sections = [
        {
            id: "footer-product",
            title: "Product",
            links: ["Features", "Customers", "Why us?", "Pricing"],
        },

        {
            id: "footer-about",
            title: "About us",
            links: ["About us", "Careers", "Leadership", "Blog", "Events"],
        },
        {
            id: "footer-get-in-touch",
            title: "Get in touch",
            links: ["Contact", "Support", "Partners", "Join research"],
        },

    ];

    const socialIcons = [
        {
            id: "tb01-dark",
            path:
                "M37.2491 3.30238C37.0498 2.18649 36.0513 1.49746 34.9878 1.50395C32.2606 1.5206 29.7927 1.60328 27.6333 1.96988C25.4705 2.33708 23.584 2.99414 22.038 4.18283C18.9929 6.52415 17.4377 10.7872 17.3724 18.3217H11.9552C10.9254 18.3217 9.94522 18.9739 9.74313 20.0674C9.51312 21.312 9.33088 23.311 9.75643 25.8014C9.95527 26.9651 10.9939 27.7324 12.1233 27.7324H17.3703V44.3867C17.3703 45.2169 17.8349 46.0595 18.7834 46.2403C19.5015 46.3773 20.6304 46.5002 22.375 46.5002C24.1168 46.5002 25.347 46.3777 26.1718 46.2437C27.2507 46.0684 27.8777 45.1191 27.8777 44.1186V27.7324H34.9316C36.0256 27.7324 37.0562 27.009 37.2608 25.8665C37.6736 23.5618 37.4742 21.4753 37.2437 20.1563C37.0465 19.0284 36.0444 18.3217 34.9653 18.3217H27.8795C27.8917 16.7111 27.9661 15.4564 28.1447 14.4728C28.341 13.3921 28.6547 12.6875 29.1044 12.2048C29.5502 11.7263 30.1817 11.4104 31.1284 11.2121C32.0832 11.0121 33.3126 10.9408 34.9123 10.9193C36.0128 10.9045 37.0511 10.1718 37.2541 9.01765C37.6718 6.64193 37.4794 4.59202 37.2491 3.30238Z",
        },
        {
            id: "tb02-dark",
            path:
                "M34.7229 4.69819C36.9179 5.13151 38.8231 6.226 39.9574 7.46121L44.8741 7.22772C46.162 7.16656 46.9576 8.61264 46.216 9.66758L42.8041 14.5217C43.7777 35.6815 22.2547 49.0961 4.54954 41.2208C3.75067 40.8654 3.58181 40.0439 3.74682 39.4029C3.91015 38.7685 4.4337 38.1304 5.23631 38.0329C7.74782 37.7279 10.886 36.8951 13.5309 34.8102C11.3351 34.4801 8.87383 33.2203 6.77118 31.5522C4.25179 29.5535 2.11595 26.8651 1.53319 24.2321C1.41942 23.7181 1.60805 23.2504 1.94754 22.9478C2.27981 22.6517 2.75116 22.5146 3.22643 22.6022C4.4998 22.8369 6.44397 23.1705 7.93366 23.3225C7.82715 23.2095 7.71399 23.0872 7.59534 22.9561C6.83881 22.1198 5.85466 20.9171 4.947 19.4528C3.13974 16.5372 1.58717 12.5021 2.86967 8.24191C3.04524 7.65872 3.52191 7.3215 4.02883 7.2399C4.52724 7.15967 5.07712 7.31911 5.46709 7.72851C7.80814 10.1862 13.7896 15.4057 22.914 16.1638C22.5823 14.0277 22.368 9.45707 27.2507 6.17582C29.7236 4.51405 32.4029 4.2402 34.7229 4.69819Z",
        },

    ];

    return (
        <footer className="bg-black text-gray-100 py-10 pt-24 max-container ">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                    {sections.map((section) => (
                        <div key={section.id} className="w-1/2 md:w-1/4 mb-6 md:mb-0">
                            <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                            <ul>
                                {section.links.map((link) => (
                                    <li key={link} className="mb-2">
                                        <a href="#" className="text-gray-400 hover:text-green-0">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center">
                    <div className="flex justify-center space-x-4">
                        {socialIcons.map((icon) => (
                            <a
                                key={icon.id}
                                href="#"
                                className="text-gray-400 hover:text-gray-200"
                                aria-label={`Link to social media ${icon.id}`}
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 48 48"
                                >
                                    <path d={icon.path} />
                                </svg>
                            </a>
                        ))}
                    </div>
                    <p className="mt-4 text-gray-500">
                        &copy; 2024 Hubeei. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
