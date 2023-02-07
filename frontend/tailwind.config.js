/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
    theme: {
        extend: {
            backgroundImage: {
                "homepage-apartments-background": "url('/src/assets/apartments-background.jpg')",
                "gradient-background": "url('/src/assets/gradient-background.jpeg')",
                "santa-monica-background": "url('/src/assets/santa-monica-background.jpg')",
            },
            boxShadow: {
                standard: "0px 0px 12px rgba(199, 199, 199, 0.4)",
            },
            padding: {
                'site-standard': '12rem'
            }
        },
    },
    plugins: [require("flowbite/plugin")],
};
