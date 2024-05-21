import React, { useState } from 'react';
import Button from '../components/Button/Button';

const pricingPlans = {
    "3 Months": [
        {
            title: 'Basic',
            price: '$24.99',
            features: ['Access to all basic content', 'Email support', 'Community access'],
        },
        {
            title: 'Pro',
            price: '$49.99',
            features: ['Everything in Basic', 'Access to premium content', 'Priority email support', 'Exclusive webinars'],
        },
        {
            title: 'Premium',
            price: '$74.99',
            features: ['Everything in Pro', '1-on-1 coaching', 'Personalized content recommendations', 'Early access to new features'],
        },
    ],
    "6 Months": [
        {
            title: 'Basic',
            price: '$44.99',
            features: ['Access to all basic content', 'Email support', 'Community access'],
        },
        {
            title: 'Pro',
            price: '$89.99',
            features: ['Everything in Basic', 'Access to premium content', 'Priority email support', 'Exclusive webinars'],
        },
        {
            title: 'Premium',
            price: '$134.99',
            features: ['Everything in Pro', '1-on-1 coaching', 'Personalized content recommendations', 'Early access to new features'],
        },
    ],
    "12 Months": [
        {
            title: 'Basic',
            price: '$79.99',
            features: ['Access to all basic content', 'Email support', 'Community access'],
        },
        {
            title: 'Pro',
            price: '$159.99',
            features: ['Everything in Basic', 'Access to premium content', 'Priority email support', 'Exclusive webinars'],
        },
        {
            title: 'Premium',
            price: '$239.99',
            features: ['Everything in Pro', '1-on-1 coaching', 'Personalized content recommendations', 'Early access to new features'],
        },
    ],
};

const Pricing = () => {
    const [selectedDuration, setSelectedDuration] = useState("3 Months");

    return (
        <section className='max-container padding-container bg-black py-12 h-full relative'>
            <div className=" ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-orange-0 tracking-wide uppercase font-['Raleway']">Pricing</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-orange-0 sm:text-4xl">
                            Choose the plan that’s right for you
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-orange-0 lg:mx-auto">
                            No hidden fees, no surprises. Simple and transparent pricing.
                        </p>
                    </div>

                    <div className="mt-10 text-center">
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            {["3 Months", "6 Months", "12 Months"].map((duration) => (
                                <button
                                    key={duration}
                                    type="button"
                                    className={`px-4 py-2 border border-gray-0 text-sm font-medium rounded-l-md ${selectedDuration === duration ? 'bg-orange-0 text-black' : 'bg-white text-gray-700'
                                        }`}
                                    onClick={() => setSelectedDuration(duration)}
                                >
                                    {duration}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {pricingPlans[selectedDuration].map((plan) => (
                                <div key={plan.title} className="bg-white py-8 px-6 shadow rounded-lg text-center flex flex-col">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{plan.title}</h3>
                                    <p className="mt-4 text-5xl font-extrabold text-gray-900">{plan.price}</p>
                                    <ul className="mt-6 space-y-4 flex-1">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex justify-center text-gray-600">
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-6 flex justify-center">
                                        <Button title={'Get started'} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
