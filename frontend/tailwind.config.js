/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "homepage-apartments-background": "url('/src/assets/apartments-background.jpg')",
            },
            boxShadow: {
                standard: "0px 0px 12px rgba(199, 199, 199, 0.4)",
            },
            spacing: {
                '3px': '3px',
                '45/100': '45%'
            },
            saturate: {
                '130': '1.30',
            }
        },
    },
    plugins: [],
};
