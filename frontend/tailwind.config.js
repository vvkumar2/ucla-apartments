/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
    theme: {
        extend: {
            backgroundImage: {
                "homepage-apartments-background": "url('/src/assets/apartments-background.jpg')",
                "gradient-background": "url('/src/assets/gradient-background.jpeg')",
                "santa-monica-background": "url('/src/assets/santa-monica-bg.jpeg')",
            },
            boxShadow: {
                standard: "0px 0px 12px rgba(199, 199, 199, 0.4)",
            },
            padding: {
                "site-standard": "12rem",
                "site-standard-mobile": "3rem",
            },
            filter: {
                blue: "invert(29%) sepia(95%) saturate(3547%) hue-rotate(220deg) brightness(84%) contrast(103%);",
            },
            colors: {
                'gray-50': '#F9FAFB',
            },
            spacing: {
                '3px': '3px',
                '45/100': '45%',
                'profile': 'calc(56px + 5vh)',
                'footer': '100vh',
                "site-standard-mobile": "3rem",
            },
            saturate: {
                '130': '1.30',
            },
            width: {
                '30': '30%'
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
