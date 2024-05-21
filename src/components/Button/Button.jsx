import React from "react"

export default function Button({title, onClick}) {
    return (
        <>

            <button onClick={onClick} className="w-full inline-flex items-center justify-center h-14 gap-2 px-8 text-sm font-bold tracking-wider text-black transition duration-300 rounded whitespace-nowrap bg-orange-0 hover:bg-orange-500 focus:bg-yellow-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-yellow-300 disabled:bg-yellow-300 disabled:shadow-none z-10">
                <span>{title ?? "Get Started"}</span>
            </button>

        </>
    )
}
