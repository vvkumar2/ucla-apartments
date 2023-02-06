/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
    theme: {
        extend: {
            backgroundImage: {
                "homepage-apartments-background": "url('/src/assets/apartments-background.jpg')",
            },
            boxShadow: {
                standard: "0px 0px 12px rgba(199, 199, 199, 0.4)",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
