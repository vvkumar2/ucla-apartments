/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato'],
      },
      backgroundImage: {
        'homepage-apartments-background': "url('/src/assets/apartments-background.jpg')",
        'gradient-background': "url('/src/assets/gradient-background.jpeg')",
        'santa-monica-background': "url('/src/assets/santa-monica-bg.jpeg')",
      },
      boxShadow: {
        standard: '0px 0px 12px rgba(199, 199, 199, 0.4)',
        blue: '0px 0px 12px rgba(29, 78, 216, 0.2)',
      },
      padding: {
        'site-standard': '3rem',
      },
      invert: {
        blue: 'invert(29%) sepia(95%) saturate(3547%) hue-rotate(220deg) brightness(84%) contrast(103%);',
      },
      colors: {
        'gray-50': '#F9FAFB',
      },
      screens: {
        md: '900px',
        1000: '1000px',
        1300: '1300px',
        xl: '1400px',
        '2xl': '1600px',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
