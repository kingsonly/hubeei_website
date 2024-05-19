/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-bg': "url('images/hero-bg.jpg')"

      },
      'fontFamily': {
        'raleway': "Raleway",
      },
      'colors':{
        orange: {
          '0': '#DCD427'
        },
        green:{
          '0':'#32746D'
        },
        gray:{
          '0': '#69626D'
        },
      },
      fontFamily: {
        roboto: ["roboto"],
      },
    },
  },
  plugins: [],
};
