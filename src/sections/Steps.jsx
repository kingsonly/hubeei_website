import React, { useState, useRef, useEffect } from "react";
import Button from "../components/Button/Button";
import img1 from '../images/step1.png';
import img2 from '../images/step2.png';
import img3 from '../images/step3.png';

export default function Steps() {
    const [tabSelected, setTabSelected] = useState({
        currentTab: 1,
        noTabs: 3,
    });

    const wrapperRef = useRef(null);

    const handleKeyDown = e => {
        if (e.keyCode === 39) {
            if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
                if (
                    tabSelected.currentTab >= 1 &&
                    tabSelected.currentTab < tabSelected.noTabs
                ) {
                    setTabSelected({
                        ...tabSelected,
                        currentTab: tabSelected.currentTab + 1,
                    });
                } else {
                    setTabSelected({
                        ...tabSelected,
                        currentTab: 1,
                    });
                }
            }
        }

        if (e.keyCode === 37) {
            if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
                if (
                    tabSelected.currentTab > 1 &&
                    tabSelected.currentTab <= tabSelected.noTabs
                ) {
                    setTabSelected({
                        ...tabSelected,
                        currentTab: tabSelected.currentTab - 1,
                    });
                } else {
                    setTabSelected({
                        ...tabSelected,
                        currentTab: tabSelected.noTabs,
                    });
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    return (
        <section className="max-w-full h-full relative max-container padding-container bg-black pb-24" aria-multiselectable="false">
            <ul
                className="flex items-center py-6"
                role="tablist"
                ref={wrapperRef}
            >
                <li className="flex-1" role="presentation">
                    <button
                        className={`-mb-px font-[Raleway] inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t px-6 text-sm font-semibold tracking-wide transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed ${tabSelected.currentTab === 1
                            ? "border-b-4 border-orange-0 text-orange-0"
                            : "text-white hover:border-b-4 hover:border-orange-0 hover:text-orange-0"
                            }`}
                        id="tab-label-1a"
                        role="tab"
                        aria-setsize="3"
                        aria-posinset="1"
                        tabIndex={`${tabSelected.currentTab === 1 ? "0" : "-1"}`}
                        aria-controls="tab-panel-1a"
                        aria-selected={`${tabSelected.currentTab === 1 ? "true" : "false"}`}
                        onClick={() => setTabSelected({ ...tabSelected, currentTab: 1 })}
                    >
                        <span>Step 1</span>
                    </button>
                </li>
                <li className="flex-1" role="presentation">
                    <button
                        className={`-mb-px font-[Raleway] inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t px-6 text-sm font-semibold tracking-wide transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed ${tabSelected.currentTab === 2
                            ? "border-b-4 border-orange-0 text-orange-0"
                            : "text-white hover:border-b-4 hover:border-orange-0 hover:text-orange-0"
                            }`}
                        id="tab-label-2a"
                        role="tab"
                        aria-setsize="3"
                        aria-posinset="2"
                        tabIndex={`${tabSelected.currentTab === 2 ? "0" : "-1"}`}
                        aria-controls="tab-panel-2a"
                        aria-selected={`${tabSelected.currentTab === 2 ? "true" : "false"}`}
                        onClick={() => setTabSelected({ ...tabSelected, currentTab: 2 })}
                    >
                        <span>Step 2</span>
                    </button>
                </li>
                <li className="flex-1" role="presentation">
                    <button
                        className={`-mb-px font-[Raleway] inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t px-6 text-sm font-semibold tracking-wide transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed ${tabSelected.currentTab === 3
                            ? "border-b-4 border-orange-0 text-orange-0"
                            : "text-white hover:border-b-4 hover:border-orange-0 hover:text-orange-0"
                            }`}
                        id="tab-label-3a"
                        role="tab"
                        aria-setsize="3"
                        aria-posinset="3"
                        tabIndex={`${tabSelected.currentTab === 3 ? "0" : "-1"}`}
                        aria-controls="tab-panel-3a"
                        aria-selected={`${tabSelected.currentTab === 3 ? "true" : "false"}`}
                        onClick={() => setTabSelected({ ...tabSelected, currentTab: 3 })}
                    >
                        <span>Step 3</span>
                    </button>
                </li>
            </ul>
            <div className="">
                <div
                    className={`px-6 py-4 text-white ${tabSelected.currentTab === 1 ? "" : "hidden"}`}
                    id="tab-panel-1a"
                    aria-hidden={`${tabSelected.currentTab === 1 ? "false" : "true"}`}
                    role="tabpanel"
                    aria-labelledby="tab-label-1a"
                    tabIndex="-1"
                >
                    <div className="flex flexStart flex-col-reverse lg:flex-row gap-11 lg:gap-20">
                        <div className="flex flex-col gap-8 w-full">
                            <h2 className="text-[28px] lg:text-[40px] font-['Raleway'] font-semibold">
                                Personalise your hub
                            </h2>
                            <p className="text-[14px] lg:text-[18px] font-roboto opacity-65">
                                Easily tweak the look and feel of your hub using the control panel.
                            </p>
                            <div className="w-full md:w-[50%]">
                                <Button title={'Get started for free'} />
                            </div>
                        </div>
                        <div>
                            <img src={img1} className="object-contain" />
                        </div>
                    </div>
                </div>
                <div
                    className={`px-6 text-white py-4 ${tabSelected.currentTab === 2 ? "" : "hidden"}`}
                    id="tab-panel-2a"
                    aria-hidden={`${tabSelected.currentTab === 2 ? "false" : "true"}`}
                    role="tabpanel"
                    aria-labelledby="tab-label-2a"
                    tabIndex="-1"
                >
                    <div className="flex flexStart flex-col-reverse lg:flex-row gap-11 lg:gap-20">
                        <div className="flex flex-col gap-8 w-full">
                            <h2 className="text-[28px] lg:text-[40px] font-['Raleway'] font-semibold">
                                Upload your content
                            </h2>
                            <p className="text-[14px] lg:text-[18px] font-roboto opacity-65">
                                Upload all the different types of content and create all the categories required.
                            </p>
                            <div className="w-full md:w-[50%]">
                                <Button title={'Get started for free'} />
                            </div>
                        </div>
                        <div>
                            <img src={img2} className="object-contain aspect-auto" />
                        </div>
                    </div>
                </div>
                <div
                    className={`px-6 text-white py-4 ${tabSelected.currentTab === 3 ? "" : "hidden"}`}
                    id="tab-panel-3a"
                    aria-hidden={`${tabSelected.currentTab === 3 ? "false" : "true"}`}
                    role="tabpanel"
                    aria-labelledby="tab-label-3a"
                    tabIndex="-1"
                >
                    <div className="flex flexStart flex-col-reverse lg:flex-row gap-11 lg:gap-20">
                        <div className="flex flex-col gap-8 w-full">
                            <h2 className="text-[28px] lg:text-[40px] font-['Raleway'] font-semibold">
                                Share
                            </h2>
                            <p className="text-[14px] lg:text-[18px] font-roboto opacity-65">
                                Share the link or embed directly into your website
                            </p>
                            <div className="w-full md:w-[50%]">
                                <Button title={'Get started for free'} />
                            </div>
                        </div>
                        <div>
                            <img src={img3} className="object-contain " />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
